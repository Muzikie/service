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
const authSource = require('../../../sources/version3/auth');
const regex = require('../../../shared/regex');

module.exports = {
	version: '2.0',
	swaggerApiPath: '/auth',
	rpcMethod: 'get.auth',
	tags: ['Auth'],
	params: {
		address: { optional: false, type: 'string', min: 3, max: 41, pattern: regex.ADDRESS_BASE32 },
	},
	source: authSource,
};