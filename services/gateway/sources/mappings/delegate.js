/*
 * LiskHQ/lisk-service
 * Copyright © 2019 Lisk Foundation
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
module.exports = {
	address: 'account.address,string',
	approval: '=,string',
	delegateWeight: '=,string',
	missedBlocks: '=,number',
	producedBlocks: '=,number',
	productivity: '=,string',
	publicKey: 'account.publicKey,string',
	secondPublicKey: 'account.secondPublicKey,string',
	rank: '=,number',
	rewards: '=,string',
	username: '=,string',
	vote: '=,string',
	totalVotesReceived: '=,string',
	isBanned: '=,boolean',
	status: '=,string',
	pomHeights: ['pomHeights', {
		start: '=,string',
		end: '=,string',
	}],
	lastForgedHeight: '=,number',
	consecutiveMissedBlocks: '=,number',
};
