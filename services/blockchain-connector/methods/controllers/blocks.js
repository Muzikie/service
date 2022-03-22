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
const actions = require('../../src/sdk_v5/actions');

const getLastBlock = async () => actions.getLastBlock();

const getBlockByID = async ({ id }) => actions.getBlockByID(id);

const getBlocksByIDs = async ({ ids }) => actions.getBlocksByIDs(ids);

const getBlockByHeight = async ({ height }) => actions.getBlockByHeight(height);

const getBlocksByHeightBetween = async ({ from, to }) => actions
	.getBlocksByHeightBetween({ from, to });

module.exports = {
	getLastBlock,
	getBlockByID,
	getBlocksByIDs,
	getBlockByHeight,
	getBlocksByHeightBetween,
};
