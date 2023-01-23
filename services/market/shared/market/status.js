/*
* LiskHQ/lisk-service
* Copyright © 2023 Lisk Foundation
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
const { getMarketPrices } = require('./market');

let isReady = false;

const getStatus = async () => {
	if (!isReady) {
		const marketPrices = await getMarketPrices();
		isReady = !!marketPrices.data.length;
	}
	return isReady;
};

module.exports = {
	getStatus,
};
