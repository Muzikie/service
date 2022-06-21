/*
 * LiskHQ/lisk-service
 * Copyright © 2022 Lisk Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 *
 */
const BluebirdPromise = require('bluebird');
const {
	Exceptions: { InvalidParamsException },
	MySQL: { getTableInstance },
	Utils: { isEmptyObject },
} = require('lisk-service-framework');

const { getBlockByID } = require('./blocks');
const { getAvailableModuleCommands } = require('../../constants');

const {
	getBase32AddressFromHex,
	getIndexedAccountInfo,
} = require('../../utils/accountUtils');
const { requestConnector } = require('../../utils/request');
const { normalizeRangeParam } = require('../../utils/paramUtils');
const { parseToJSONCompatObj } = require('../../utils/parser');

const transactionsIndexSchema = require('../../database/schema/transactions');
const config = require('../../../config');

const MYSQL_ENDPOINT = config.endpoints.mysql;

const getTransactionsIndex = () => getTableInstance('transactions', transactionsIndexSchema, MYSQL_ENDPOINT);

const resolveModuleCommand = async (moduleCommandVal) => {
	const availableModuleCommands = await getAvailableModuleCommands();
	const [module, command] = moduleCommandVal.split(':');
	let response;
	if (!Number.isNaN(Number(module)) && !Number.isNaN(Number(command))) {
		const { name } = (availableModuleCommands
			.find(moduleCommand => moduleCommand.id === moduleCommandVal));
		response = name;
	} else {
		const { id } = (availableModuleCommands
			.find(moduleCommand => moduleCommand.name === moduleCommandVal));
		response = id;
	}
	if ([undefined, null, '']
		.includes(response)) return new Error(`Incorrect moduleCommand ID/Name combination: ${moduleCommandVal}`);
	return response;
};

const getTransactionsByBlockIDs = async blockIDs => {
	const transactionsDB = await getTransactionsIndex();
	const transactions = await transactionsDB.find({
		whereIn: {
			property: 'blockId',
			values: blockIDs,
		},
	}, ['id']);
	const transactionsIds = transactions.map(t => t.id);
	return transactionsIds;
};

const normalizeTransaction = async tx => {
	const availableModuleCommands = await getAvailableModuleCommands();
	const [{ id, name }] = availableModuleCommands
		.filter(module => module.id === String(tx.moduleID).concat(':', tx.commandID));

	const normalizedTransaction = parseToJSONCompatObj(tx);
	normalizedTransaction.moduleCommandID = id;
	normalizedTransaction.moduleCommandName = name;
	if (normalizedTransaction.params.recipientAddress) {
		normalizedTransaction.params
			.recipientAddress = getBase32AddressFromHex(tx.params.recipientAddress);
	}
	if (normalizedTransaction.params.votes && normalizedTransaction.params.votes.length) {
		normalizedTransaction.params.votes
			.forEach(vote => vote.delegateAddress = getBase32AddressFromHex(vote.delegateAddress));
	}

	return normalizedTransaction;
};

const normalizeTransactions = async txs => {
	const normalizedTransactions = await BluebirdPromise.map(
		txs,
		async tx => normalizeTransaction(tx),
		{ concurrency: txs.length },
	);
	return normalizedTransactions;
};

const getTransactionByID = async id => {
	const response = await requestConnector('getTransactionByID', { id });
	return normalizeTransaction(response);
};

const getTransactionsByIDs = async ids => {
	const response = await requestConnector('getTransactionsByIDs', { ids });
	return normalizeTransactions(response);
};

const validateParams = async params => {
	if (params.height && typeof params.height === 'string' && params.height.includes(':')) {
		params = normalizeRangeParam(params, 'height');
	}

	if (params.timestamp && params.timestamp.includes(':')) {
		params = normalizeRangeParam(params, 'timestamp');
	}

	if (params.nonce && !(params.senderAddress)) {
		throw new InvalidParamsException('Nonce based retrieval is only possible along with senderAddress');
	}

	if (params.moduleCommandName) {
		const { moduleCommandName, ...remParams } = params;
		params = remParams;

		params.moduleCommandId = await resolveModuleCommand(moduleCommandName);
	}

	if (params.executionStatus) {
		const { executionStatus, ...remParams } = params;
		params = remParams;
		const executionStatuses = executionStatus.split(',').map(e => e.trim()).filter(e => e !== 'any');
		params.whereIn = { property: 'executionStatus', values: executionStatuses };
	}

	return params;
};

const getTransactions = async params => {
	const transactionsDB = await getTransactionsIndex();
	const transactions = {
		data: [],
		meta: {},
	};

	params = await validateParams(params);

	const total = await transactionsDB.count(params);
	const resultSet = await transactionsDB.find(
		{ ...params, limit: params.limit || total },
		['id', 'timestamp', 'height', 'blockID', 'executionStatus'],
	);
	params.ids = resultSet.map(row => row.id);

	if (params.ids.length) {
		const BATCH_SIZE = 25;
		for (let i = 0; i < Math.ceil(params.ids.length / BATCH_SIZE); i++) {
			transactions.data = transactions.data.concat(
				// eslint-disable-next-line no-await-in-loop
				await getTransactionsByIDs(params.ids.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE)),
			);
		}
	} else if (params.id) {
		transactions.data.push(await getTransactionByID(params.id));
		if ('offset' in params && params.limit) {
			transactions.data = transactions.data.slice(params.offset, params.offset + params.limit);
		}
	}

	transactions.data = await BluebirdPromise.map(
		transactions.data,
		async transaction => {
			const indexedTxInfo = resultSet.find(txInfo => txInfo.id === transaction.id);

			const senderAccount = await getIndexedAccountInfo(
				{ address: transaction.senderAddress, limit: 1 },
				['address', 'publicKey', 'name'],
			);

			transaction.sender = {
				address: senderAccount.address,
				publicKey: senderAccount.publicKey,
				name: senderAccount.name,
			};

			if (!isEmptyObject(transaction.params) && transaction.params.recipientAddress) {
				const recipientAccount = await getIndexedAccountInfo(
					{ address: transaction.params.recipientAddress, limit: 1 },
					['address', 'publicKey', 'name'],
				);

				transaction.params.recipient = {
					address: recipientAccount.address,
					publicKey: recipientAccount.publicKey,
					name: recipientAccount.name,
				};
			}

			transaction.block = {
				id: indexedTxInfo.blockID,
				height: indexedTxInfo.height,
				timestamp: indexedTxInfo.timestamp,
			};

			transaction.executionStatus = indexedTxInfo.executionStatus;

			// The two lines below are necessary for transaction statistics
			if (transaction.moduleCommandID) transaction.type = transaction.moduleCommandID;
			transaction.amount = transaction.params.amount || 0;

			return transaction;
		},
		{ concurrency: transactions.data.length },
	);

	transactions.meta.total = total;
	transactions.meta.count = transactions.data.length;
	transactions.meta.offset = params.offset;

	return transactions;
};

const getTransactionsByBlockID = async blockID => {
	const block = await getBlockByID(blockID);
	const transactions = await BluebirdPromise.map(
		block.payload,
		async (transaction) => {
			const senderAccount = await getIndexedAccountInfo(
				{ address: transaction.senderAddress, limit: 1 },
				['address', 'publicKey', 'name'],
			);

			transaction.sender = {
				address: senderAccount.address,
				publicKey: senderAccount.publicKey,
				name: senderAccount.name,
			};

			if (!isEmptyObject(transaction.params) && transaction.params.recipientAddress) {
				const recipientAccount = await getIndexedAccountInfo(
					{ address: transaction.params.recipientAddress, limit: 1 },
					['address', 'publicKey', 'name'],
				);

				transaction.params.recipient = {
					address: recipientAccount.address,
					publicKey: recipientAccount.publicKey,
					name: recipientAccount.name,
				};
			}

			transaction.block = {
				id: block.header.id,
				height: block.header.height,
				timestamp: block.header.timestamp,
			};

			// TODO: Check - this information might not be available yet
			const transactionsDB = await getTransactionsIndex();
			const [indexedTxInfo = {}] = await transactionsDB.find(
				{ id: transaction.id, limit: 1 },
				['executionStatus'],
			);
			transaction.executionStatus = indexedTxInfo.executionStatus;

			return transaction;
		},
		{ concurrency: block.payload.length },
	);

	return {
		data: await normalizeTransaction(transactions),
		meta: {
			offset: 0,
			count: transactions.length,
			total: transactions.length,
		},
	};
};

module.exports = {
	getTransactions,
	getTransactionsByBlockIDs,
	getTransactionsByBlockID,
	getTransactionsByIDs,
	normalizeTransaction,
};
