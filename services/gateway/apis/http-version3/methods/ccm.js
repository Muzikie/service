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
const ccmSource = require('../../../sources/version3/ccm');
const envelope = require('../../../sources/version3/mappings/stdEnvelope');
const regex = require('../../../shared/regex');

module.exports = {
	version: '2.0',
	swaggerApiPath: '/events',
	rpcMethod: 'get.events',
	tags: ['Events'],
	params: {
		transactionID: { optional: true, type: 'string', min: 1, max: 64, pattern: regex.HASH_SHA256 },
		moduleCommandID: { optional: true, type: 'string', min: 1, max: 21 },
		moduleCommandName: { optional: true, type: 'string', min: 1 },
		senderAddress: { optional: true, type: 'string', min: 3, max: 41, pattern: regex.ADDRESS_BASE32 },
		status: {
			optional: true,
			type: 'string',
			enum: ['ok', 'module_not_supported', 'ccm_not_supported', 'channel_unavailable', 'recovered'],
		},
		nonce: { optional: true, type: 'string', min: 1, pattern: regex.NONCE },
		timestamp: { optional: true, type: 'string', min: 1, pattern: regex.TIMESTAMP_RANGE },
		limit: { optional: true, type: 'number', min: 1, max: 100, default: 10 },
		offset: { optional: true, type: 'number', min: 0, default: 0 },
		sort: {
			optional: true,
			type: 'string',
			enum: ['timestamp:asc', 'timestamp:desc'],
			default: 'timestamp:desc',
		},
	},
	source: ccmSource,
	envelope,
};
