/*
 * LiskHQ/lisk-service
 * Copyright © 2021 Lisk Foundation
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
	WAIT_TIME_VOTER,
	WAIT_TIME_SELF_VOTE,
	PUNISH_TIME_VOTER,
	PUNISH_TIME_SELF_VOTE,
} = require('./constants');

const {
	findPomHeightForUnlock,
} = require('./pom');

const {
	getIndexedAccountInfo,
	getLisk32AddressFromPublicKey,
	updateAccountPublicKey,
} = require('../../../utils/accountUtils');
const { getAddressByName } = require('../../../utils/delegateUtils');
const { parseToJSONCompatObj } = require('../../../utils/parser');
const { requestConnector } = require('../../../utils/request');

const calculateUnlockEndHeight = (unlock, account, delegateAcc) => {
	if (unlock.delegateAddress === account.address) { // self-unvote
		const pomHeight = findPomHeightForUnlock(unlock, account, true);
		return pomHeight
			? pomHeight + PUNISH_TIME_SELF_VOTE
			: unlock.unvoteHeight + WAIT_TIME_SELF_VOTE;
	}

	const pomHeight = findPomHeightForUnlock(unlock, delegateAcc, false);
	return pomHeight
		? pomHeight + PUNISH_TIME_VOTER
		: unlock.unvoteHeight + WAIT_TIME_VOTER;
};

const standardizeUnlockHeight = (unlock, account, delegateAcc) => ({
	start: unlock.unvoteHeight,
	end: calculateUnlockEndHeight(unlock, account, delegateAcc),
});

const getUnlocks = async params => {
	const unlocks = {
		data: {},
		meta: {},
	};

	if (params.name) {
		params.address = await getAddressByName(params.name);
	}

	if (params.publicKey) {
		params.address = await getLisk32AddressFromPublicKey(params.publicKey);
	}

	const response = await requestConnector('dpos_getVoter', { address: params.address });

	// TODO: Remove if condition when proper error handling implemented in SDK
	let normalizedUnlocks;

	if (!response.error) {
		normalizedUnlocks = response.pendingUnlocks.map(unlock => parseToJSONCompatObj(unlock));
	} else {
		normalizedUnlocks = [];
	}

	const accountInfo = await getIndexedAccountInfo({ address: params.address, limit: 1 }, ['name', 'publicKey']);
	unlocks.data = {
		address: params.address,
		publicKey: accountInfo && accountInfo.publicKey ? accountInfo.publicKey : null,
		name: accountInfo && accountInfo.name ? accountInfo.name : null,
		unlocking: normalizedUnlocks,
	};

	// Update index when public key is not indexed
	if (params.publicKey && !accountInfo.publicKey) updateAccountPublicKey(params.publicKey);

	const total = unlocks.data.unlocking.length;
	unlocks.data.unlocking = unlocks.data.unlocking
		.slice(params.offset, params.offset + params.limit);

	unlocks.meta = {
		count: unlocks.data.unlocking.length,
		offset: params.offset,
		total,
	};

	return unlocks;
};

module.exports = {
	calculateUnlockEndHeight,
	standardizeUnlockHeight,
	getUnlocks,
};
