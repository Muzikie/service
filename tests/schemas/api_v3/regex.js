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
const IP = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const HASH_SHA256 = /^\b([A-Fa-f0-9]){1,64}\b$/;
const MODULE_ID = /^\b(?:[0-9]+:[0-9]+)\b$/;
const MODULE_NAME = /^\b(?:[0-9a-zA-Z]+:[0-9a-zA-Z]+)\b$/;
const SEMVER = /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/;

module.exports = {
	IP,
	HASH_SHA256,
	MODULE_ID,
	MODULE_NAME,
	SEMVER,
};
