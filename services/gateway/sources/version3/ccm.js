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
const ccm = require('./mappings/ccm');

module.exports = {
	type: 'moleculer',
	method: 'indexer.ccm',
	params: {
		transactionID: '=,string',
		moduleCommandID: '=',
		moduleCommandName: '=',
		senderAddress: '=,string',
		status: '=,string',
		timestamp: '=,string',
		nonce: '=',
		limit: '=,number',
		offset: '=,number',
		sort: '=,string',
	},
	definition: {
		data: ['data', ccm],
		meta: {
			count: '=,number',
			offset: '=,number',
			total: '=,number',
		},
		links: {},
	},
};
