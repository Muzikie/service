/*
 * Klayrhq/klayrservice
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
const {
	address: { getKlayr32AddressFromPublicKey: getKlayr32AddressFromPublicKeyHelper },
} = require('@klayr/cryptography');

const {
	DB: {
		MySQL: { getTableInstance },
	},
} = require('klayr-service-framework');

const accountsTableSchema = require('../database/schema/accounts');
const config = require('../../config');

const MYSQL_ENDPOINT = config.endpoints.mysql;

const getAccountsTable = () => getTableInstance(accountsTableSchema, MYSQL_ENDPOINT);

const getKlayr32AddressFromPublicKey = publicKey =>
	getKlayr32AddressFromPublicKeyHelper(Buffer.from(publicKey, 'hex'));

const updateAccountInfo = async params => {
	const accountInfo = {};
	Object.keys(accountsTableSchema.schema).forEach(columnName => {
		if (columnName in params) {
			accountInfo[columnName] = params[columnName];
		}
	});

	const accountsTable = await getAccountsTable();
	await accountsTable.upsert(accountInfo);
};

module.exports = {
	getKlayr32AddressFromPublicKey,
	updateAccountInfo,
};
