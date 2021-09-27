/*
 * LiskHQ/lisk-service
 * Copyright © 2019 Lisk Foundation
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
const { Logger } = require('lisk-service-framework');
const BullQueue = require('bull');

const packageJson = require('../../package.json');
const config = require('../../config');

const logger = Logger();

const queuePool = {};

const STATS_INTERVAL = 15 * 1000; // ms

const queueInstance = (jobName = 'defaultJob', jobFn, concurrency = 1, options = config.queue.defaults) => {
	const queueName = 'defaultQueue';

	if (!queuePool[queueName]) {
		queuePool[queueName] = new BullQueue(queueName, {
			redis: config.endpoints.redis,
			// limiter: options.limiter,
			prefix: `queue-${packageJson.name}`,
			defaultJobOptions: options.defaultJobOptions,
			settings: options.settings,
		});

		const queue = queuePool[queueName];

		logger.info(`Initialized queue ${queueName}`);

		queue.on('completed', (job) => {
			logger.debug(`${queueName} Job completed ${job.name}`);
			job.remove();
		});

		queue.on('error', (err) => {
			logger.error(`${queueName} Job error`, err);
		});

		queue.on('failed', (job, err) => {
			logger.warn(`${queueName} Job failed`, err.message);
			logger.warn(`${queueName} Job failed`, err.stack);
		});

		setInterval(async () => {
			const jc = await queue.getJobCounts();
			logger.debug(`Queue counters: waiting: ${jc.waiting}, active: ${jc.active}, completed: ${jc.completed}, failed: ${jc.failed}, delayed: ${jc.delayed}, paused: ${jc.paused}`);
		}, STATS_INTERVAL);
	}

	const queue = queuePool[queueName];

	queue.process(jobName, concurrency, jobFn);

	const add = (params) => queue.add(jobName, params);

	const { pause, resume } = () => queue;

	return {
		add,
		queue,
		pause,
		resume,
	};
};

module.exports = queueInstance;
