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
const MessageQueue = require('bull');
const BluebirdPromise = require('bluebird');

const {
	Logger,
} = require('lisk-service-framework');

const logger = Logger();

const { initEventsScheduler } = require('./eventsScheduler');
const {
	getMissingBlocks,
	getIndexVerifiedHeight,
	setIndexVerifiedHeight,
} = require('./sources/indexer');

const { getAllPosValidators } = require('./sources/connector');

const {
	getCurrentHeight,
	getGenesisHeight,
	initNodeConstants,
} = require('./constants');

const config = require('../config');

const blockIndexQueue = new MessageQueue(
	config.queue.blocks.name,
	config.endpoints.messageQueue,
	{ defaultJobOptions: config.queue.defaultJobOptions },
);

const accountIndexQueue = new MessageQueue(
	config.queue.accounts.name,
	config.endpoints.messageQueue,
	{ defaultJobOptions: config.queue.defaultJobOptions },
);

const getInProgressJobCount = async (queue) => {
	const jobCount = await queue.getJobCounts();
	const count = jobCount.active + jobCount.waiting;
	return count;
};

const scheduleBlocksIndexing = async (heights) => {
	const blockHeights = Array.isArray(heights)
		? heights
		: [heights];

	blockHeights.sort((h1, h2) => h1 - h2); // sort by ascending height

	await BluebirdPromise.map(
		blockHeights,
		async height => {
			await blockIndexQueue.add({ height });
			logger.debug(`Scheduled indexing for block at height: ${height}.`);
		},
		{ concurrency: blockHeights.length },
	);
};

const scheduleValidatorsIndexing = async (validators) => {
	await BluebirdPromise.map(
		validators,
		async validator => accountIndexQueue.add({
			account: {
				...validator,
				isValidator: true,
			},
		}),
		{ concurrency: validators.length },
	);

	logger.info(`Finished scheduling of validators indexing with ${validators.length} validators.`);
};

const indexGenesisBlock = async () => {
	const genesisHeight = await getGenesisHeight();
	logger.debug('Scheduling genesis block indexing.');
	await scheduleBlocksIndexing(genesisHeight);
	logger.info('Finished scheduling genesis block indexing.');
};

const initIndexingScheduler = async () => {
	// Get all validators and schedule indexing
	logger.debug('Initializing validator indexing scheduler.');
	const { validators } = await getAllPosValidators();
	if (Array.isArray(validators) && validators.length) {
		await scheduleValidatorsIndexing(validators);
	}
	logger.debug('Validator indexing initialization completed successfully.');

	// Check for missing blocks
	logger.debug('Initializing block indexing scheduler.');
	const genesisHeight = await getGenesisHeight();
	const currentHeight = await getCurrentHeight();
	const lastVerifiedHeight = await getIndexVerifiedHeight() || genesisHeight + 1;

	logger.trace(`Checking for missing blocks between heights: ${lastVerifiedHeight} - ${currentHeight}.`);
	const missingBlockHeights = await getMissingBlocks(lastVerifiedHeight, currentHeight);

	// Schedule indexing for the missing blocks
	if (Array.isArray(missingBlockHeights) && missingBlockHeights.length) {
		logger.trace(`Missing blocks found between heights: ${lastVerifiedHeight} - ${currentHeight}.\n${missingBlockHeights.join(' ,')}`);
		await scheduleBlocksIndexing(missingBlockHeights);
	} else {
		logger.trace(`No missing blocks found between heights: ${lastVerifiedHeight} - ${currentHeight}.`);
	}
	logger.debug('Block indexing initialization completed successfully.');
};

const scheduleMissingBlocksIndexing = async () => {
	const genesisHeight = await getGenesisHeight();
	const currentHeight = await getCurrentHeight();

	const jobCount = await getInProgressJobCount(blockIndexQueue);

	// Skip job scheduling when the jobCount is greater than the threshold
	if (jobCount > config.job.indexMissingBlocks.skipThreshold) {
		logger.info('Skipping missing blocks job run.');
		return;
	}

	// Missing blocks are being checked during regular interval
	// By default they are checked from the blockchain's beginning
	const lastVerifiedHeight = await getIndexVerifiedHeight() || genesisHeight;

	// Lowest and highest block heights expected to be indexed
	const blockIndexHigherRange = currentHeight;
	const blockIndexLowerRange = lastVerifiedHeight;

	const missingBlocksByHeight = await getMissingBlocks(
		blockIndexLowerRange,
		blockIndexHigherRange,
	);

	try {
		if (!Array.isArray(missingBlocksByHeight)) {
			logger.trace(`missingBlocksByHeight: ${missingBlocksByHeight}`);
			throw new Error(`Expected missingBlocksByHeight to be an array but found ${typeof missingBlocksByHeight}.`);
		}

		if (missingBlocksByHeight.length === 0) {
			// Update 'indexVerifiedHeight' when no missing blocks are found
			await setIndexVerifiedHeight(blockIndexHigherRange);
		} else {
			// Schedule indexing for the missing blocks
			await scheduleBlocksIndexing(missingBlocksByHeight);
		}
	} catch (err) {
		logger.warn(`Missing blocks indexing failed due to: ${err.message}.`);
	}
};

const init = async () => {
	try {
		await indexGenesisBlock();
		await initIndexingScheduler();
		await initEventsScheduler();
		await initNodeConstants();
	} catch (error) {
		logger.error(`Unable to initialize coordinator due to: ${error.message}`);
	}
};

module.exports = {
	init,
	scheduleMissingBlocksIndexing,
};
