/*
 * Klayrhq/klayrservice
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
const {
	address: {
		getKlayr32AddressFromPublicKey: getKlayr32AddressFromPublicKeyHelper,
		getKlayr32AddressFromAddress,
	},
	legacyAddress: { getLegacyAddressFromPublicKey },
} = require('@klayr/cryptography');

const getLegacyFormatAddressFromPublicKey = publicKey => {
	const legacyAddress = getLegacyAddressFromPublicKey(Buffer.from(publicKey, 'hex'));
	return legacyAddress;
};

const getKlayr32AddressFromPublicKey = publicKey =>
	getKlayr32AddressFromPublicKeyHelper(Buffer.from(publicKey, 'hex'));

const getKlayr32AddressFromHexAddress = address =>
	getKlayr32AddressFromAddress(Buffer.from(address, 'hex'));

// TODO: Remove once SDK returns address in Klayr32 format (https://github.com/KlayrHQ/klayr-sdk/issues/7629)
const getKlayr32Address = address =>
	address.startsWith('kly') ? address : getKlayr32AddressFromHexAddress(address);

module.exports = {
	getLegacyAddressFromPublicKey: getLegacyFormatAddressFromPublicKey,
	getKlayr32AddressFromPublicKey,
	getKlayr32AddressFromHexAddress,
	getKlayr32Address,
};
