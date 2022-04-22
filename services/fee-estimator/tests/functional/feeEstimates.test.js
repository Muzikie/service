/*
 * LiskHQ/lisk-service
 * Copyright © 2020 Lisk Foundation
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
	emptyBlock,
	nonEmptyBlock,
	fullySaturatedBlock,
} = require('../constants/blocks');

const {
	calculateBlockSize,
	calculateWeightedAvg,
	calculateFeePerByte,
	EMAcalc,
	getEstimateFeeByteForBlock,
} = require('../../shared/core');

const noTrafficMockup = require('../blockGenerator/noTraffic.json');
const lowTrafficMockup = require('../blockGenerator/lowTraffic.json');
const moderateTrafficMockup = require('../blockGenerator/moderateTraffic.json');
const highTrafficMockup = require('../blockGenerator/highTraffic.json');

describe('Fee estimation tests', () => {
	describe('calculateBlockSize', () => {
		it('Zero transactions', async () => {
			const blockSize = await calculateBlockSize(emptyBlock);
			expect(blockSize).toBe(0);
		});

		it('Non-zero transactions', async () => {
			const blockSize = await calculateBlockSize(nonEmptyBlock);
			expect(blockSize).toBeGreaterThan(0);
			expect(blockSize).toBeLessThanOrEqual(15 * 2 ** 10);
		});

		it('Non-zero transactions: Fully saturated block', async () => {
			const blockSize = await calculateBlockSize(fullySaturatedBlock);
			expect(blockSize).not.toBe(0);
			expect(blockSize).toBeGreaterThan(15 * 2 ** 10 - 130);
			expect(blockSize).toBeLessThanOrEqual(15 * 2 ** 10);
		});
	});

	describe('calculateWeightedAvg', () => {
		it('Batch of empty blocks (noTraffic)', async () => {
			const wavg = await calculateWeightedAvg(noTrafficMockup.blocks);
			expect(wavg).toBe(0);
		});

		it('Batch of non-empty blocks (lowTraffic)', async () => {
			const wavg = await calculateWeightedAvg(lowTrafficMockup.blocks);
			expect(wavg).not.toBe(0);
			expect(wavg).toBeCloseTo(3415.461411305321);
		});

		it('Batch of non-empty blocks (moderateTraffic)', async () => {
			const wavg = await calculateWeightedAvg(moderateTrafficMockup.blocks);
			expect(wavg).not.toBe(0);
			expect(wavg).toBeCloseTo(86516.13500397495);
		});

		it('Batch of non-empty blocks (highTraffic)', async () => {
			const wavg = await calculateWeightedAvg(highTrafficMockup.blocks);
			expect(wavg).not.toBe(0);
			expect(wavg).toBeCloseTo(160374.80717213583);
		});
	});

	xdescribe('calculateFeePerByte for Blocks', () => {
		it('Empty block', async () => {
			const feePerByte = await calculateFeePerByte(emptyBlock);
			expect(feePerByte.low).toBe(0);
			expect(feePerByte.med).toBe(0);
			expect(feePerByte.high).toBe(1);
			expect(feePerByte).toEqual({
				low: 0,
				med: 0,
				high: 1,
			});
		});

		it('Non-empty block', async () => {
			const block = nonEmptyBlock;
			block.payload = block.payload.map(transaction => {
				transaction.fee = BigInt(transaction.fee);
				return transaction;
			});

			const feePerByte = await calculateFeePerByte(block);
			expect(feePerByte.low).toBeCloseTo(0);
			expect(feePerByte.med).toBeCloseTo(36.501497200885304);
			expect(feePerByte.high).toBeCloseTo(1727.6700292873413);
			expect(feePerByte).toEqual({
				low: 0,
				med: 36.501497200885304,
				high: 1727.6700292873413,
			});
		});
	});

	describe('EMA computation', () => {
		it('Zero offset', async () => {
			const feePerByte = {
				low: 3,
				med: 4,
				high: 5,
			};
			const prevFeeEstPerByte = {};

			const EMAoutput = EMAcalc(feePerByte, prevFeeEstPerByte);
			expect(EMAoutput.feeEstLow).toBeCloseTo(0.10217999999999999);
			expect(EMAoutput.feeEstMed).toBeCloseTo(0.13624);
			expect(EMAoutput.feeEstHigh).toBeCloseTo(0.1703);
			expect(EMAoutput).toEqual({
				feeEstLow: 0.10217999999999999,
				feeEstMed: 0.13624,
				feeEstHigh: 0.1703,
			});
		});

		it('Non-zero offset', async () => {
			const feePerByte = {
				low: 0,
				med: 301.9,
				high: 2364.4,
			};
			const prevFeeEstPerByte = {
				low: 0,
				med: 1000,
				high: 2000,
			};

			const EMAoutput = EMAcalc(feePerByte, prevFeeEstPerByte);
			expect(EMAoutput.feeEstLow).toBeCloseTo(0);
			expect(EMAoutput.feeEstMed).toBeCloseTo(976.222714);
			expect(EMAoutput.feeEstHigh).toBeCloseTo(2012.411464);
			expect(EMAoutput).toEqual({
				feeEstLow: 0,
				feeEstMed: 976.222714,
				feeEstHigh: 2012.411464,
			});
		});
	});

	xdescribe('getEstimateFeeByteForBlock', () => {
		const feeEstPerByteKeys = [
			'low',
			'med',
			'high',
			'updated',
			'blockHeight',
			'blockId',
		];

		describe('Zero prevFeeEstPerByte', () => {
			const prevFeeEstPerByte = {};

			it('No network traffic', async () => {
				const blockBatch = { data: noTrafficMockup.blocks };

				const feeEstPerByte = await getEstimateFeeByteForBlock(blockBatch, prevFeeEstPerByte);
				expect(Object.keys(feeEstPerByte)).toEqual(feeEstPerByteKeys);
				expect(feeEstPerByte.low).toBe(0);
				expect(feeEstPerByte.med).toBe(0);
				expect(feeEstPerByte.high).toBe(0);
				expect(feeEstPerByte.updated).toBeGreaterThan(Math.floor(Date.now() / 1000) - 1);
				expect(feeEstPerByte.updated).toBeLessThanOrEqual(Math.floor(Date.now() / 1000));
				expect(feeEstPerByte.blockHeight).toEqual(blockBatch.data[0].height);
				expect(feeEstPerByte.blockId).toBe(blockBatch.data[0].id);
			});

			it('Low network traffic', async () => {
				const blockBatch = { data: lowTrafficMockup.blocks };

				const feeEstPerByte = await getEstimateFeeByteForBlock(blockBatch, prevFeeEstPerByte);
				expect(Object.keys(feeEstPerByte)).toEqual(feeEstPerByteKeys);
				expect(feeEstPerByte.low).toBe(0);
				expect(feeEstPerByte.med).toBe(0);
				expect(feeEstPerByte.high).toBe(0);
				expect(feeEstPerByte.updated).toBeGreaterThan(Math.floor(Date.now() / 1000) - 1);
				expect(feeEstPerByte.updated).toBeLessThanOrEqual(Math.floor(Date.now() / 1000));
				expect(feeEstPerByte.blockHeight).toEqual(blockBatch.data[0].height);
				expect(feeEstPerByte.blockId).toBe(blockBatch.data[0].id);
			});

			it('Moderate network traffic', async () => {
				const blockBatch = { data: moderateTrafficMockup.blocks };

				const feeEstPerByte = await getEstimateFeeByteForBlock(blockBatch, prevFeeEstPerByte);
				expect(Object.keys(feeEstPerByte)).toEqual(feeEstPerByteKeys);
				expect(feeEstPerByte.low).toBe(0);
				expect(feeEstPerByte.med).toBeCloseTo(4.4813044863950005);
				expect(feeEstPerByte.high).toBeCloseTo(5.859755832313501);
				expect(feeEstPerByte.updated).toBeGreaterThan(Math.floor(Date.now() / 1000) - 1);
				expect(feeEstPerByte.updated).toBeLessThanOrEqual(Math.floor(Date.now() / 1000));
				expect(feeEstPerByte.blockHeight).toEqual(blockBatch.data[0].height);
				expect(feeEstPerByte.blockId).toBe(blockBatch.data[0].id);
			});

			it('High network traffic', async () => {
				const blockBatch = { data: highTrafficMockup.blocks };

				const feeEstPerByte = await getEstimateFeeByteForBlock(blockBatch, prevFeeEstPerByte);
				expect(Object.keys(feeEstPerByte)).toEqual(feeEstPerByteKeys);
				expect(feeEstPerByte.low).toBe(0);
				expect(feeEstPerByte.med).toBeCloseTo(1.2432409946621534);
				expect(feeEstPerByte.high).toBeCloseTo(58.84444119752685);
				expect(feeEstPerByte.updated).toBeGreaterThan(Math.floor(Date.now() / 1000) - 1);
				expect(feeEstPerByte.updated).toBeLessThanOrEqual(Math.floor(Date.now() / 1000));
				expect(feeEstPerByte.blockHeight).toEqual(blockBatch.data[0].height);
				expect(feeEstPerByte.blockId).toBe(blockBatch.data[0].id);
			});
		});

		describe('Non-zero prevFeeEstPerByte', () => {
			const prevFeeEstPerByte = {
				low: 0,
				med: 1000,
				high: 2000,
			};

			it('No network traffic', async () => {
				const blockBatch = { data: noTrafficMockup.blocks };

				const feeEstPerByte = await getEstimateFeeByteForBlock(blockBatch, prevFeeEstPerByte);
				expect(Object.keys(feeEstPerByte)).toEqual(feeEstPerByteKeys);
				expect(feeEstPerByte.low).toBe(0);
				expect(feeEstPerByte.med).toBe(0);
				expect(feeEstPerByte.high).toBe(0);
				expect(feeEstPerByte.updated).toBeGreaterThan(Math.floor(Date.now() / 1000) - 1);
				expect(feeEstPerByte.updated).toBeLessThanOrEqual(Math.floor(Date.now() / 1000));
				expect(feeEstPerByte.blockHeight).toEqual(blockBatch.data[0].height);
				expect(feeEstPerByte.blockId).toBe(blockBatch.data[0].id);
			});

			it('Low network traffic', async () => {
				const blockBatch = { data: lowTrafficMockup.blocks };

				const feeEstPerByte = await getEstimateFeeByteForBlock(blockBatch, prevFeeEstPerByte);
				expect(Object.keys(feeEstPerByte)).toEqual(feeEstPerByteKeys);
				expect(feeEstPerByte.low).toBe(0);
				expect(feeEstPerByte.med).toBe(0);
				expect(feeEstPerByte.high).toBe(0);
				expect(feeEstPerByte.updated).toBeGreaterThan(Math.floor(Date.now() / 1000) - 1);
				expect(feeEstPerByte.updated).toBeLessThanOrEqual(Math.floor(Date.now() / 1000));
				expect(feeEstPerByte.blockHeight).toEqual(blockBatch.data[0].height);
				expect(feeEstPerByte.blockId).toBe(blockBatch.data[0].id);
			});

			it('Moderate network traffic', async () => {
				const blockBatch = { data: moderateTrafficMockup.blocks };

				const feeEstPerByte = await getEstimateFeeByteForBlock(blockBatch, prevFeeEstPerByte);
				expect(Object.keys(feeEstPerByte)).toEqual(feeEstPerByteKeys);
				expect(feeEstPerByte.low).toBe(0);
				expect(feeEstPerByte.med).toBeCloseTo(970.421304486395);
				expect(feeEstPerByte.high).toBeCloseTo(1937.7397558323137);
				expect(feeEstPerByte.updated).toBeGreaterThan(Math.floor(Date.now() / 1000) - 1);
				expect(feeEstPerByte.updated).toBeLessThanOrEqual(Math.floor(Date.now() / 1000));
				expect(feeEstPerByte.blockHeight).toEqual(blockBatch.data[0].height);
				expect(feeEstPerByte.blockId).toBe(blockBatch.data[0].id);
			});

			it('High network traffic', async () => {
				const blockBatch = { data: highTrafficMockup.blocks };

				const feeEstPerByte = await getEstimateFeeByteForBlock(blockBatch, prevFeeEstPerByte);
				expect(Object.keys(feeEstPerByte)).toEqual(feeEstPerByteKeys);
				expect(feeEstPerByte.low).toBe(0);
				expect(feeEstPerByte.med).toBeCloseTo(967.1832409946622);
				expect(feeEstPerByte.high).toBeCloseTo(1990.7244411975269);
				expect(feeEstPerByte.updated).toBeGreaterThan(Math.floor(Date.now() / 1000) - 1);
				expect(feeEstPerByte.updated).toBeLessThanOrEqual(Math.floor(Date.now() / 1000));
				expect(feeEstPerByte.blockHeight).toEqual(blockBatch.data[0].height);
				expect(feeEstPerByte.blockId).toBe(blockBatch.data[0].id);
			});
		});
	});
});
