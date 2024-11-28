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
const { calcTargetPairPrices } = require('../../shared/market/priceUpdater');
const { marketPriceItemSchema } = require('../schemas/marketPriceItem.schema');

describe('Market prices calculation', () => {
	it('Target pairs are a direct match within the raw prices', async () => {
		const targetPairs = ['KLY_BTC', 'KLY_EUR', 'BTC_EUR', 'BTC_USD'];
		const rawPricesBySource = {
			cryptoExchange1: [
				{
					code: 'KLY_BTC',
					from: 'KLY',
					to: 'BTC',
					rate: '0.000095',
					updateTimestamp: 1622414485,
					sources: ['cx1'],
				},
				{
					code: 'BTC_EUR',
					from: 'BTC',
					to: 'EUR',
					rate: '28500',
					updateTimestamp: 1622414485,
					sources: ['cx1'],
				},
			],
			cryptoExchange2: [
				{
					code: 'BTC_USD',
					from: 'BTC',
					to: 'USD',
					rate: '35000',
					updateTimestamp: 1622414485,
					sources: ['cx2'],
				},
				{
					code: 'KLY_EUR',
					from: 'KLY',
					to: 'BTC',
					rate: '2.75',
					updateTimestamp: 1622414485,
					sources: ['cx2'],
				},
			],
		};

		const targetPairPrices = calcTargetPairPrices(rawPricesBySource, targetPairs);
		expect(Object.keys(targetPairPrices).length).toEqual(targetPairs.length);
		Object.values(targetPairPrices).forEach(prices => {
			expect(prices).toBeInstanceOf(Array);
			expect(prices.length).toBeGreaterThanOrEqual(1);
			prices.forEach(price => marketPriceItemSchema.validate(price));
		});

		// Deep compare the results
		expect(targetPairPrices.KLY_BTC).toEqual([
			{
				code: 'KLY_BTC',
				from: 'KLY',
				to: 'BTC',
				rate: '0.00009500',
				updateTimestamp: 1622414485,
				sources: ['cx1'],
			},
		]);

		expect(targetPairPrices.KLY_EUR).toEqual([
			{
				code: 'KLY_EUR',
				from: 'KLY',
				to: 'BTC',
				rate: '2.7500',
				updateTimestamp: 1622414485,
				sources: ['cx2'],
			},
		]);

		expect(targetPairPrices.BTC_EUR).toEqual([
			{
				code: 'BTC_EUR',
				from: 'BTC',
				to: 'EUR',
				rate: '28500.0000',
				updateTimestamp: 1622414485,
				sources: ['cx1'],
			},
		]);

		expect(targetPairPrices.BTC_USD).toEqual([
			{
				code: 'BTC_USD',
				from: 'BTC',
				to: 'USD',
				rate: '35000.0000',
				updateTimestamp: 1622414485,
				sources: ['cx2'],
			},
		]);
	});

	it('Target pairs are a transitive match of two raw prices', async () => {
		const targetPairs = ['KLY_CHF', 'BTC_CHF'];
		const rawPricesBySource = {
			cryptoExchange1: [
				{
					code: 'BTC_EUR',
					from: 'BTC',
					to: 'EUR',
					rate: '28500',
					updateTimestamp: 1622414485,
					sources: ['cx1'],
				},
			],
			cryptoExchange2: [
				{
					code: 'KLY_EUR',
					from: 'KLY',
					to: 'BTC',
					rate: '2.75',
					updateTimestamp: 1622414485,
					sources: ['cx2'],
				},
			],
			fiatExchange1: [
				{
					code: 'EUR_CHF',
					from: 'EUR',
					to: 'CHF',
					rate: '1.10',
					updateTimestamp: 1622414485,
					sources: ['fx1'],
				},
				{
					code: 'EUR_USD',
					from: 'EUR',
					to: 'USD',
					rate: '1.22',
					updateTimestamp: 1622414485,
					sources: ['fx1'],
				},
			],
		};

		const targetPairPrices = calcTargetPairPrices(rawPricesBySource, targetPairs);
		expect(Object.keys(targetPairPrices).length).toEqual(targetPairs.length);
		Object.values(targetPairPrices).forEach(prices => {
			expect(prices).toBeInstanceOf(Array);
			expect(prices.length).toBeGreaterThanOrEqual(1);
			prices.forEach(price => marketPriceItemSchema.validate(price));
		});

		// Deep compare the results
		expect(targetPairPrices.KLY_CHF).toEqual([
			{
				code: 'KLY_CHF',
				from: 'KLY',
				to: 'CHF',
				rate: '3.0250',
				updateTimestamp: 1622414485,
				sources: ['cx2', 'fx1'],
			},
		]);

		expect(targetPairPrices.BTC_CHF).toEqual([
			{
				code: 'BTC_CHF',
				from: 'BTC',
				to: 'CHF',
				rate: '31350.0000',
				updateTimestamp: 1622414485,
				sources: ['cx1', 'fx1'],
			},
		]);
	});

	it('Target prices are a mixed bag', async () => {
		const targetPairs = [
			'KLY_BTC',
			'KLY_EUR',
			'KLY_USD',
			'KLY_CHF',
			'BTC_EUR',
			'BTC_USD',
			'BTC_CHF',
		];
		const rawPricesBySource = {
			cryptoExchange1: [
				{
					code: 'KLY_BTC',
					from: 'KLY',
					to: 'BTC',
					rate: '0.000095',
					updateTimestamp: 1622414485,
					sources: ['cx1'],
				},
				{
					code: 'BTC_EUR',
					from: 'BTC',
					to: 'EUR',
					rate: '28500',
					updateTimestamp: 1622414485,
					sources: ['cx1'],
				},
			],
			cryptoExchange2: [
				{
					code: 'BTC_USD',
					from: 'BTC',
					to: 'USD',
					rate: '35000',
					updateTimestamp: 1622414485,
					sources: ['cx2'],
				},
				{
					code: 'KLY_EUR',
					from: 'KLY',
					to: 'BTC',
					rate: '2.75',
					updateTimestamp: 1622414485,
					sources: ['cx2'],
				},
			],
			fiatExchange1: [
				{
					code: 'EUR_CHF',
					from: 'EUR',
					to: 'CHF',
					rate: '1.10',
					updateTimestamp: 1622414485,
					sources: ['fx1'],
				},
				{
					code: 'EUR_USD',
					from: 'EUR',
					to: 'USD',
					rate: '1.22',
					updateTimestamp: 1622414485,
					sources: ['fx1'],
				},
			],
		};

		const targetPairPrices = calcTargetPairPrices(rawPricesBySource, targetPairs);
		expect(Object.keys(targetPairPrices).length).toEqual(targetPairs.length);
		Object.values(targetPairPrices).forEach(prices => {
			expect(prices).toBeInstanceOf(Array);
			expect(prices.length).toBeGreaterThanOrEqual(1);
			prices.forEach(price => marketPriceItemSchema.validate(price));
		});

		// Deep compare the results
		expect(targetPairPrices.KLY_BTC).toEqual([
			{
				code: 'KLY_BTC',
				from: 'KLY',
				to: 'BTC',
				rate: '0.00009500',
				updateTimestamp: 1622414485,
				sources: ['cx1'],
			},
		]);

		expect(targetPairPrices.KLY_EUR).toEqual([
			{
				code: 'KLY_EUR',
				from: 'KLY',
				to: 'BTC',
				rate: '2.7500',
				updateTimestamp: 1622414485,
				sources: ['cx2'],
			},
		]);

		expect(targetPairPrices.KLY_USD).toEqual([
			{
				code: 'KLY_USD',
				from: 'KLY',
				to: 'USD',
				rate: '3.3250',
				updateTimestamp: 1622414485,
				sources: ['cx1', 'cx2'],
			},
			{
				code: 'KLY_USD',
				from: 'KLY',
				to: 'USD',
				rate: '3.3550',
				updateTimestamp: 1622414485,
				sources: ['cx2', 'fx1'],
			},
		]);

		expect(targetPairPrices.KLY_CHF).toEqual([
			{
				code: 'KLY_CHF',
				from: 'KLY',
				to: 'CHF',
				rate: '3.0250',
				updateTimestamp: 1622414485,
				sources: ['cx2', 'fx1'],
			},
		]);

		expect(targetPairPrices.BTC_EUR).toEqual([
			{
				code: 'BTC_EUR',
				from: 'BTC',
				to: 'EUR',
				rate: '28500.0000',
				updateTimestamp: 1622414485,
				sources: ['cx1'],
			},
		]);

		expect(targetPairPrices.BTC_USD).toEqual([
			{
				code: 'BTC_USD',
				from: 'BTC',
				to: 'USD',
				rate: '35000.0000',
				updateTimestamp: 1622414485,
				sources: ['cx2'],
			},
			{
				code: 'BTC_USD',
				from: 'BTC',
				to: 'USD',
				rate: '34770.0000',
				updateTimestamp: 1622414485,
				sources: ['cx1', 'fx1'],
			},
		]);

		expect(targetPairPrices.BTC_CHF).toEqual([
			{
				code: 'BTC_CHF',
				from: 'BTC',
				to: 'CHF',
				rate: '31350.0000',
				updateTimestamp: 1622414485,
				sources: ['cx1', 'fx1'],
			},
		]);
	});
});
