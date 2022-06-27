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

module.exports = {
	calculateUnlockEndHeight,
	standardizeUnlockHeight,
};