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
const path = require('path');

const mockBusinessPath = path.resolve(`${__dirname}/../../../../shared/dataService/business`);
const mockValidatorsPath = path.resolve(`${__dirname}/../../../../shared/dataService`);

const { posValidators: mockPosValidators } = require('../../../constants/validators');

beforeEach(() => {
	jest.resetModules();
	jest.mock(mockBusinessPath, () => {
		const actual = jest.requireActual(mockBusinessPath);
		return {
			...actual,
			getPosValidatorsByStake: () => mockPosValidators,
		};
	});
});

describe('Test validateValidatorCache method', () => {
	it('should not call reloadValidatorCache when validator cache is correct', async () => {
		const mockReloadValidatorCache = jest.fn();
		jest.mock(mockValidatorsPath, () => {
			const actual = jest.requireActual(mockValidatorsPath);
			return {
				...actual,
				getAllValidators: () => mockPosValidators,
				reloadValidatorCache: mockReloadValidatorCache,
			};
		});

		const { validateValidatorCache } = require('../../../../shared/jobs/validateValidatorsCache');
		await validateValidatorCache();
		expect(mockReloadValidatorCache).toHaveBeenCalledTimes(0);
	});

	it('should call reloadValidatorCache when node returns more validators than cache', async () => {
		const mockReloadValidatorCache = jest.fn();
		jest.mock(mockValidatorsPath, () => {
			const actual = jest.requireActual(mockValidatorsPath);
			return {
				...actual,
				getAllValidators: () => mockPosValidators.slice(0, mockPosValidators.length - 1),
				reloadValidatorCache: mockReloadValidatorCache,
			};
		});

		const { validateValidatorCache } = require('../../../../shared/jobs/validateValidatorsCache');
		await validateValidatorCache();
		expect(mockReloadValidatorCache).toHaveBeenCalledTimes(1);
	});

	it('should call reloadValidatorCache when node validators rank is different than cached validators', async () => {
		const mockReloadValidatorCache = jest.fn();
		jest.mock(mockValidatorsPath, () => {
			const actual = jest.requireActual(mockValidatorsPath);
			return {
				...actual,
				getAllValidators: () => {
					const arrayCopy = mockPosValidators.slice();
					const len = arrayCopy.length;
					[arrayCopy[len - 1], arrayCopy[len - 2]] = [arrayCopy[len - 2], arrayCopy[len - 1]];
					return arrayCopy;
				},
				reloadValidatorCache: mockReloadValidatorCache,
			};
		});

		const { validateValidatorCache } = require('../../../../shared/jobs/validateValidatorsCache');
		await validateValidatorCache();
		expect(mockReloadValidatorCache).toHaveBeenCalledTimes(1);
	});
});
