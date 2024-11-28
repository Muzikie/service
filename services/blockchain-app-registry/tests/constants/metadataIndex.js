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
const appMetaObj = {
	title: 'testChain999 - Betanet',
	description: 'Metadata configuration for the testChain999 blockchain (mainchain) in betanet',
	chainName: 'testChain999',
	chainID: '02999999',
	networkType: 'betanet',
	genesisURL: 'https://downloads.klayr.xyz/klayr/betanet/genesis_block.json.tar.gz',
	projectPage: 'https://klayr.xyz',
	logo: {
		png: 'https://lisk-qa.ams3.digitaloceanspaces.com/Artboard%201%20copy%2019.png',
		svg: 'https://lisk-qa.ams3.digitaloceanspaces.com/Logo-20.svg',
	},
	backgroundColor: '#f7f9fb',
	serviceURLs: [
		{
			http: 'https://betanet-service.klayr.xyz',
			ws: 'wss://betanet-service.klayr.xyz',
		},
	],
	explorers: [
		{
			url: 'https://betanet.liskscan.com',
			txnPage: 'https://betanet.liskscan.com/transactions',
		},
	],
	appNodes: [
		{
			url: 'https://betanet.klayr.xyz',
			maintainer: 'Klayr Labs B.V.',
		},
		{
			url: 'wss://betanet.klayr.xyz',
			maintainer: 'Klayr Labs B.V.',
		},
	],
	appDirName: 'testChain999',
};

const tokenMetaObj = {
	title: 'Klayr - Betanet - Native tokens',
	tokens: [
		{
			tokenID: '0299999900000000',
			tokenName: 'Klayr-test',
			description: 'Default token for the entire Klayr ecosystem',
			denomUnits: [
				{
					denom: 'beddows-test',
					decimals: 0,
					aliases: ['Beddows-test'],
				},
				{
					denom: 'kly-test',
					decimals: 8,
					aliases: ['Klayr-test'],
				},
			],
			baseDenom: 'beddows-test',
			displayDenom: 'kly-test',
			symbol: 'KLY-test',
			logo: {
				png: 'https://lisk-qa.ams3.digitaloceanspaces.com/Artboard%201%20copy%2019.png',
				svg: 'https://lisk-qa.ams3.digitaloceanspaces.com/Logo-20.svg',
			},
		},
	],
};

module.exports = {
	appMetaObj,
	tokenMetaObj,
};
