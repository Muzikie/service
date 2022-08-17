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
const BluebirdPromise = require('bluebird');
const path = require('path');

const {
	Logger,
	MySQL: {
		getTableInstance,
		getDbConnection,
		startDbTransaction,
		commitDbTransaction,
		rollbackDbTransaction,
	},
} = require('lisk-service-framework');

const applicationsIndexSchema = require('./database/schema/applications');
const tokensIndexSchema = require('./database/schema/tokens');

const { getDirectories, read, getFiles } = require('./utils/fsUtils');

const config = require('../config');

const MYSQL_ENDPOINT = config.endpoints.mysql;

const getApplicationsIndex = () => getTableInstance(
	applicationsIndexSchema.tableName,
	applicationsIndexSchema,
	MYSQL_ENDPOINT,
);
const getTokensIndex = () => getTableInstance(
	tokensIndexSchema.tableName,
	tokensIndexSchema,
	MYSQL_ENDPOINT,
);

const logger = Logger();

const [, , , , repo] = config.gitHub.appRegistryRepo.split('/');

const FILENAME = {
	APP_JSON: 'app.json',
	NATIVETOKENS_JSON: 'nativetokens.json',
};

const KNOWN_CONFIG_FILES = Object.values(FILENAME);

const indexTokensInfo = async (tokenInfo, dbTrx) => {
	const tokensDB = await getTokensIndex();

	const tokenInfoToIndex = await BluebirdPromise.map(
		tokenInfo.tokens,
		async (token) => {
			const result = {
				chainID: tokenInfo.chainID,
				chainName: tokenInfo.chainName,
				network: tokenInfo.network,
				tokenID: token.tokenID,
				tokenName: token.name,
			};
			return result;
		},
		{ concurrency: tokenInfo.assets.length },
	);

	await tokensDB.upsert(tokenInfoToIndex, dbTrx);
};

const indexChainInfo = async (chainInfo, dbTrx) => {
	const applicationsDB = await getApplicationsIndex();

	const chainInfoToIndex = {
		chainID: chainInfo.chainID,
		chainName: chainInfo.chainName,
		network: chainInfo.networkType,
		isDefault: config.defaultApps.some(e => e === chainInfo.chainName),
		appDirName: chainInfo.appDirName,
	};

	await applicationsDB.upsert(chainInfoToIndex, dbTrx);
};

const indexMetadataFromFile = async (network, app, filename = null, dbTrx) => {
	logger.debug(`Indexing metadata information for the app: ${app} (${network})`);

	if (!network || !app) throw Error('Require both \'network\' and \'app\'.');

	const appPathInClonedRepo = `${process.cwd()}/data/${repo}/${network}/${app}`;
	logger.trace('Reading chain information');
	const chainInfoString = await read(`${appPathInClonedRepo}/app.json`);
	const chainInfo = { ...JSON.parse(chainInfoString), appDirName: app };

	if (filename === FILENAME.APP_JSON || filename === null) {
		logger.debug(`Indexing chain information for the app: ${app} (${network})`);
		await indexChainInfo(chainInfo, dbTrx);
		logger.debug(`Indexed chain information for the app: ${app} (${network})`);
	}

	if (filename === FILENAME.NATIVETOKENS_JSON || filename === null) {
		logger.trace('Reading tokens information');
		const tokenInfoString = await read(`${appPathInClonedRepo}/nativetokens.json`);
		const tokenInfo = {
			...JSON.parse(tokenInfoString),
			chainName: chainInfo.chainName,
			chainID: chainInfo.chainID,
			network,
		};

		logger.debug(`Indexing tokens information for the app: ${app} (${network})`);
		await indexTokensInfo(tokenInfo, dbTrx);
		logger.debug(`Indexed tokens information for the app: ${app} (${network})`);
	}
	logger.info(`Finished indexing metadata information for the app: ${app} (${network})`);
};

const indexBlockchainMetadata = async () => {
	const dataDirectory = './data';
	const repoPath = path.join(dataDirectory, repo);
	const { supportedNetworks } = config;

	await BluebirdPromise.map(
		supportedNetworks,
		async network => {
			const appDirPath = path.join(repoPath, network);
			const allAvailableApps = await getDirectories(appDirPath);

			await BluebirdPromise.map(
				allAvailableApps,
				async app => {
					const allFilesFromApp = await getFiles(`${app}`);
					await BluebirdPromise.map(
						allFilesFromApp,
						async file => {
							const [, , , appName, filename] = file.split('/');
							// Only process the known config files
							if (KNOWN_CONFIG_FILES.includes(filename)) {
								const connection = await getDbConnection();
								const dbTrx = await startDbTransaction(connection);

								try {
									logger.debug('Created new MySQL transaction to index blockchain metadata information');
									await indexMetadataFromFile(network, appName, filename, dbTrx);
									await commitDbTransaction(dbTrx);
									logger.debug('Committed MySQL transaction to index blockchain metadata information');
								} catch (error) {
									await rollbackDbTransaction(dbTrx);
									logger.debug('Rolled back MySQL transaction to index blockchain metadata information');
								}
							}
						},
						{ concurrency: allFilesFromApp.length },
					);
				},
				{ concurrency: allAvailableApps.length },
			);
		},
		{ concurrency: supportedNetworks.length },
	);
};

module.exports = {
	indexBlockchainMetadata,
	indexMetadataFromFile,
};
