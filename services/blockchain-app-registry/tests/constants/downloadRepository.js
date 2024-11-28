/*
 * Klayrhq/klayrservice
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
const getModifiedFileNamesInput = {
	betanet: {
		Klayr: [{ filename: 'betanet/Klayr/app.json' }, { filename: 'betanet/Klayr/nativetokens.json' }],
		Enevti: [
			{ filename: 'betanet/Enevti/app.json' },
			{ filename: 'betanet/Enevti/nativetokens.json' },
		],
	},
};

const getModifiedFileNamesExpectedResponse = [
	'betanet/Klayr/app.json',
	'betanet/Klayr/nativetokens.json',
	'betanet/Enevti/app.json',
	'betanet/Enevti/nativetokens.json',
];

module.exports = {
	getModifiedFileNamesInput,
	getModifiedFileNamesExpectedResponse,
};
