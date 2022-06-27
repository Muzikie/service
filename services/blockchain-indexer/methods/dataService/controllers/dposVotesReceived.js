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
const { HTTP } = require('lisk-service-framework');

const { StatusCodes: { NOT_FOUND } } = HTTP;

const dataService = require('../../../shared/dataService');

const {
	confirmAnyId,
} = require('../../../shared/accountUtils');

const getVotesReceived = async params => {
	const isFound = await confirmAnyId(params);
	if (!isFound && params.address) return { status: NOT_FOUND, data: { error: `Account with address ${params.address} not found.` } };
	if (!isFound && params.name) return { status: NOT_FOUND, data: { error: `Account with name ${params.name} not found.` } };

	const votesReceived = {
		data: {},
		meta: {},
	};

	const response = await dataService.getVotesReceived(params);
	if (response.data) votesReceived.data = response.data;
	if (response.meta) votesReceived.meta = response.meta;

	return votesReceived;
};

module.exports = {
	getVotesReceived,
};