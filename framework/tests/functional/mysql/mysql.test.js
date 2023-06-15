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
const {
	getTableInstance,
	startDBTransaction,
	commitDBTransaction,
	getDBConnection,
	rollbackDBTransaction,
} = require('../../../src/mysql');

const schema = require('../../constants/blocksSchema');
const compositeKeySchema = require('../../constants/compositeKeySchema');

const tableName = 'functional_test';
const compositeKeyTableName = 'composite_primary_key';

schema.tableName = tableName;
compositeKeySchema.tableName = compositeKeyTableName;

const getTable = () => getTableInstance(schema);
const getCompositeKeyTable = () => getTableInstance(compositeKeySchema);

const { emptyBlock, nonEmptyBlock } = require('../../constants/blocks');

describe('Test MySQL', () => {
	let testTable;
	let compositeKeyTable;
	beforeAll(async () => {
		// Get table
		testTable = await getTable();
		compositeKeyTable = await getCompositeKeyTable();
	});

	afterAll(async () => {
		// Drop table
		await testTable.rawQuery(`DROP TABLE IF EXISTS ${tableName}`);
		await compositeKeyTable.rawQuery(`DROP TABLE IF EXISTS ${compositeKeyTableName}`);
	});

	describe('Generic MySQL validation', () => {
		it('should validate if primary key is set', async () => {
			const result = await testTable.rawQuery(`SHOW KEYS FROM ${tableName} WHERE Key_name = 'PRIMARY'`);
			expect(result.length).toBe(1);
			expect(result[0].Column_name).toBe(schema.primaryKey);
		});

		it('should validate if composite primary key is set', async () => {
			const result = await compositeKeyTable.rawQuery(`SHOW KEYS FROM ${compositeKeyTableName} WHERE Key_name = 'PRIMARY'`);
			expect(result.length).toBe(compositeKeySchema.primaryKey.length);
			result
				.forEach(res => expect(compositeKeySchema.primaryKey.includes(res.Column_name)).toBe(true));
		});

		it('should check if table exists', async () => {
			const result = await testTable.find();
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(0);
		});
	});

	describe('With IMPLICIT DB transaction (auto-commit mode)', () => {
		afterAll(() => testTable.rawQuery(`TRUNCATE ${tableName}`));

		it('should insert row', async () => {
			await testTable.upsert([emptyBlock]);
			const result = await testTable.find();
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(1);
		});

		it('should get rows', async () => {
			const result = await testTable.find({ id: emptyBlock.id }, ['id']);
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(1);

			const [retrievedBlock] = result;
			expect(retrievedBlock.id).toBe(emptyBlock.id);
		});

		it('should get rows with composite table', async () => {
			await compositeKeyTable.upsert([emptyBlock]);
			const result = await compositeKeyTable.find({ id: emptyBlock.id });
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(1);

			const [retrievedBlock] = result;
			expect(retrievedBlock.id).toBe(emptyBlock.id);
		});

		it('should get rows using whereIn', async () => {
			await testTable.upsert([emptyBlock, nonEmptyBlock]);
			const params = {
				whereIn: [{
					property: 'height',
					values: [emptyBlock.height, nonEmptyBlock.height],
				},
				{
					property: 'id',
					values: [emptyBlock.id],
				}],
			};
			const result = await testTable.find(params, ['id']);
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(1);

			const [retrievedBlock] = result;
			expect(retrievedBlock.id).toBe(emptyBlock.id);
		});

		it('should get rows using whereIn with composite table', async () => {
			await compositeKeyTable.upsert([emptyBlock, nonEmptyBlock]);
			const params = {
				whereIn: [{
					property: 'height',
					values: [emptyBlock.height, nonEmptyBlock.height],
				},
				{
					property: 'id',
					values: [emptyBlock.id],
				}],
			};
			const result = await compositeKeyTable.find(params);
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(1);

			const [retrievedBlock] = result;
			expect(retrievedBlock.id).toBe(emptyBlock.id);
		});

		it('should update row', async () => {
			await testTable.upsert([{ ...emptyBlock, size: 50 }]);

			const [retrievedBlock] = await testTable.find({ id: emptyBlock.id }, ['id', 'size']);
			expect(retrievedBlock.id).toBe(emptyBlock.id);
			expect(retrievedBlock.size).toBe(50);
		});

		it('should get single row when limit is set to 1', async () => {
			await testTable.upsert([emptyBlock, nonEmptyBlock]);
			const result = await testTable.find({ limit: 1 });
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(1);
		});

		it('should sort the rows in ascending order based on their height', async () => {
			await testTable.upsert([emptyBlock, nonEmptyBlock]);
			const result = await testTable.find({ sort: 'height:asc' });
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(2);
			expect(result[1].height).toBeGreaterThanOrEqual(result[0].height);
		});

		it('should sort the rows in descending order based on their height', async () => {
			await testTable.upsert([emptyBlock, nonEmptyBlock]);
			const result = await testTable.find({ sort: 'height:desc' });
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(2);
			expect(result[0].height).toBeGreaterThanOrEqual(result[1].height);
		});

		it('should order the rows in ascending order based on their height', async () => {
			await testTable.upsert([emptyBlock, nonEmptyBlock]);
			const result = await testTable.find({ order: 'height:asc' });
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(2);
			expect(result[1].height).toBeGreaterThanOrEqual(result[0].height);
		});

		it('should order the rows in descending order based on their height', async () => {
			await testTable.upsert([emptyBlock, nonEmptyBlock]);
			const result = await testTable.find({ order: 'height:desc' });
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(2);
			expect(result[0].height).toBeGreaterThanOrEqual(result[1].height);
		});

		it('should get row count', async () => {
			const count = await testTable.count();
			expect(count).toBe(2);
		});

		it('should get row count using whereIn', async () => {
			await testTable.upsert([emptyBlock, nonEmptyBlock]);
			const params = {
				whereIn: [{
					property: 'height',
					values: [emptyBlock.height, nonEmptyBlock.height],
				},
				{
					property: 'id',
					values: [emptyBlock.id],
				}],
			};
			const result = await testTable.count(params);
			expect(result).toBe(1);
		});

		it('should get row count using whereNotNull', async () => {
			await testTable.upsert([emptyBlock, nonEmptyBlock]);
			const params = {
				whereNotNull: ['generatorPublicKey', 'timestamp'],
			};
			const result = await testTable.count(params);
			expect(result).toBe(2);
		});

		it('should get row count using whereNull', async () => {
			await testTable.upsert([emptyBlock, nonEmptyBlock]);
			const params = {
				whereNull: ['isFinal'],
			};
			const result = await testTable.count(params);
			expect(result).toBe(2);
		});

		it('should get row count using whereIn and whereNull', async () => {
			await testTable.upsert([emptyBlock, nonEmptyBlock]);
			const params = {
				whereIn: [{
					property: 'height',
					values: [emptyBlock.height, nonEmptyBlock.height],
				},
				{
					property: 'id',
					values: [emptyBlock.id],
				}],
				whereNull: ['isFinal'],
			};
			const result = await testTable.count(params);
			expect(result).toBe(1);
		});

		it('should get row count with params', async () => {
			const count = await testTable.count({ id: 'not_existing_id' });
			expect(count).toEqual(0);
		});

		it('should increment column value', async () => {
			const [currentBlock] = await testTable.find({ id: emptyBlock.id }, ['timestamp']);
			const currentTimestamp = currentBlock.timestamp;

			await testTable.increment({
				increment: { timestamp: 5 },
				where: { id: emptyBlock.id },
			});

			const [retrievedBlock] = await testTable.find({ id: emptyBlock.id }, ['timestamp']);
			expect(retrievedBlock).toBeTruthy();
			expect(retrievedBlock.timestamp).toBe(5 + currentTimestamp);
		});

		it('should decrement column value', async () => {
			const [currentBlock] = await testTable.find({ id: emptyBlock.id }, ['timestamp']);
			const currentTimestamp = currentBlock.timestamp;

			await testTable.decrement({
				decrement: { timestamp: 5 },
				where: { id: emptyBlock.id },
			});

			const [retrievedBlock] = await testTable.find({ id: emptyBlock.id }, ['timestamp']);
			expect(retrievedBlock).toBeTruthy();
			expect(retrievedBlock.timestamp).toBe(currentTimestamp - 5);
		});

		it('should delete row by primary key', async () => {
			const [existingBlock] = await testTable.find();
			const existingBlockId = existingBlock[`${schema.primaryKey}`];
			const count = await testTable.deleteByPrimaryKey([existingBlockId]);
			expect(count).toEqual(1);

			const result = await testTable.find({ [schema.primaryKey]: existingBlock[schema.primaryKey] }, ['id']);
			expect(result.length).toBe(0);
			expect(result.every(b => b.id !== existingBlock.id)).toBeTruthy();
		});

		it('should delete rows', async () => {
			await testTable.upsert([emptyBlock, nonEmptyBlock]);
			const existingBlock = await testTable.find({}, ['id']);
			const existingBlockCount = await testTable.count();

			const existingIds = existingBlock.map(block => block.id);
			const numAffectedRows = await testTable.delete({ whereIn: { property: 'id', values: existingIds } });
			expect(numAffectedRows).toEqual(existingBlockCount);

			const count = await testTable.count({});
			expect(count).toBe(0);
		});

		it('should delete row', async () => {
			await testTable.upsert([emptyBlock]);
			const existingBlock = await testTable.find({}, ['id']);
			const existingBlockCount = await testTable.count();

			const existingId = existingBlock.map(block => block.id);
			const numAffectedRows = await testTable.delete({ whereIn: { property: 'id', values: existingId } });
			expect(numAffectedRows).toEqual(existingBlockCount);

			const count = await testTable.count({});
			expect(count).toBe(0);
		});

		it('should perform batch row insert', async () => {
			await testTable.upsert([emptyBlock, nonEmptyBlock]);
			const result = await testTable.find();
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(2);
		});

		it('should execute distinct query', async () => {
			await testTable.upsert([emptyBlock, { ...nonEmptyBlock, id: emptyBlock.id }]);
			const result = await testTable.find();
			const distinctResult = await testTable.find({ distinct: 'id' }, 'id');
			expect(result.length).toBeGreaterThan(distinctResult.length);
		});

		it('should execute update method', async () => {
			const [retrievedBlock] = await testTable.find({ id: emptyBlock.id }, ['timestamp']);
			expect(retrievedBlock.timestamp).toBe(emptyBlock.timestamp);

			const params = {
				where: { height: emptyBlock.height },
				updates: { timestamp: emptyBlock.timestamp + 1000 },
			};

			await testTable.update(params);

			const [retrievedBlock1] = await testTable.find({ id: emptyBlock.id }, ['timestamp']);
			expect(retrievedBlock1.timestamp).toBe(params.updates.timestamp);
		});

		it('should return records matching the superset of payload', async () => {
			// Insert a test record.
			await testTable.upsert([nonEmptyBlock]);

			// Construct the query parameters.
			const params = {
				whereJsonSupersetOf: {
					property: 'payload',
					values: [nonEmptyBlock.payload[0]],
				},
			};

			// Perform the query.
			const result = await testTable.find(params, ['id']);

			// Assert the result.
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(1);
			const [retrievedBlock] = result;
			expect(retrievedBlock.id).toBe(nonEmptyBlock.id);
		});

		it('should not return any records when there is no match in payload', async () => {
			// Insert a test record.
			await testTable.upsert([nonEmptyBlock]);

			// Construct the query parameters.
			const params = {
				whereJsonSupersetOf: {
					property: 'payload',
					values: [{ invalidPayload: 1 }],
				},
			};

			// Perform the query.
			const result = await testTable.find(params, ['id']);

			// Assert the result.
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(0);
		});

		it('should return records if any one of the provided values are present in payload', async () => {
			// Insert a test record.
			await testTable.upsert([nonEmptyBlock]);

			// Construct the query parameters.
			const params = {
				whereJsonSupersetOf: {
					property: 'payload',
					values: [nonEmptyBlock.payload[0], { invalidPayload: 1 }],
				},
			};

			// Perform the query.
			const result = await testTable.find(params, ['id']);

			// Assert the result.
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(1);
			const [retrievedBlock] = result;
			expect(retrievedBlock.id).toBe(nonEmptyBlock.id);
		});

		it('should not return records if all of the provided values are not present in payload', async () => {
			// Insert a test record.
			await testTable.upsert([nonEmptyBlock]);

			// Construct the query parameters.
			const params = {
				whereJsonSupersetOf: {
					property: 'payload',
					values: [{ invalidPayload: 1 }, { invalidPayload: 2 }],
				},
			};

			// Perform the query.
			const result = await testTable.find(params, ['id']);

			// Assert the result.
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(0);
		});

		it('should return records if any of the provided values are present in metadata', async () => {
			// Insert a test record.
			await testTable.upsert([nonEmptyBlock]);

			// Construct the query parameters.
			const params = {
				whereJsonSupersetOf: {
					property: 'payload',
					values: [nonEmptyBlock.payload[0], nonEmptyBlock.payload[1], nonEmptyBlock.payload[2]],
				},
			};

			// Perform the query.
			const result = await testTable.find(params, ['id']);

			// Assert the result.
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(1);
			const [retrievedBlock] = result;
			expect(retrievedBlock.id).toBe(nonEmptyBlock.id);
		});
	});

	describe('With EXPLICIT DB transaction (non-auto commit mode)', () => {
		afterAll(() => testTable.rawQuery(`TRUNCATE ${tableName}`));

		it('should insert row', async () => {
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([emptyBlock], trx);
			await commitDBTransaction(trx);
			const result = await testTable.find();
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(1);
		});

		it('should get rows', async () => {
			const result = await testTable.find({ id: emptyBlock.id }, ['id']);
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(1);

			const [retrievedBlock] = result;
			expect(retrievedBlock.id).toBe(emptyBlock.id);
		});

		it('should get rows using whereIn', async () => {
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([emptyBlock, nonEmptyBlock], trx);
			await commitDBTransaction(trx);

			const params = {
				whereIn: [{
					property: 'height',
					values: [emptyBlock.height, nonEmptyBlock.height],
				},
				{
					property: 'id',
					values: [emptyBlock.id],
				}],
			};
			const result = await testTable.find(params, ['id']);
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(1);

			const [retrievedBlock] = result;
			expect(retrievedBlock.id).toBe(emptyBlock.id);
		});

		it('should get rows using whereNotNull', async () => {
			await testTable.upsert([emptyBlock, nonEmptyBlock]);
			const params = {
				whereNotNull: ['generatorPublicKey', 'timestamp'],
			};
			const result = await testTable.find(params, ['id']);
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(2);
		});

		it('should get rows using whereNull', async () => {
			await testTable.upsert([emptyBlock, nonEmptyBlock]);
			const params = {
				whereNull: ['isFinal'],
			};
			const result = await testTable.find(params, ['id']);
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(2);
		});

		it('should get rows using whereNotNull and whereIn', async () => {
			await testTable.upsert([emptyBlock, nonEmptyBlock]);
			const params = {
				whereIn: [{
					property: 'height',
					values: [emptyBlock.height, nonEmptyBlock.height],
				},
				{
					property: 'id',
					values: [emptyBlock.id],
				}],
				whereNotNull: ['generatorPublicKey'],
			};
			const result = await testTable.find(params, ['id']);
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(1);

			const [retrievedBlock] = result;
			expect(retrievedBlock.id).toBe(emptyBlock.id);
		});

		it('should update row', async () => {
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([{ ...emptyBlock, size: 50 }], trx);
			await commitDBTransaction(trx);
			const [retrievedBlock] = await testTable.find({ id: emptyBlock.id }, ['id', 'size']);
			expect(retrievedBlock.id).toBe(emptyBlock.id);
			expect(retrievedBlock.size).toBe(50);
		});

		it('should get single row when limit is set to 1', async () => {
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([{ ...emptyBlock, size: 50 }], trx);
			await commitDBTransaction(trx);

			const result = await testTable.find({ limit: 1 });
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(1);
		});

		it('should sort the rows in ascending order based on their height', async () => {
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([{ ...emptyBlock, size: 50 }], trx);
			await commitDBTransaction(trx);

			const result = await testTable.find({ sort: 'height:asc' });
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(2);
			expect(result[1].height).toBeGreaterThanOrEqual(result[0].height);
		});

		it('should sort the rows in descending order based on their height', async () => {
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([{ ...emptyBlock, size: 50 }], trx);
			await commitDBTransaction(trx);

			const result = await testTable.find({ sort: 'height:desc' });
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(2);
			expect(result[0].height).toBeGreaterThanOrEqual(result[1].height);
		});

		it('should order the rows in ascending order based on their height', async () => {
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([{ ...emptyBlock, size: 50 }], trx);
			await commitDBTransaction(trx);

			const result = await testTable.find({ order: 'height:asc' });
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(2);
			expect(result[1].height).toBeGreaterThanOrEqual(result[0].height);
		});

		it('should order the rows in descending order based on their height', async () => {
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([{ ...emptyBlock, size: 50 }], trx);
			await commitDBTransaction(trx);

			const result = await testTable.find({ order: 'height:desc' });
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(2);
			expect(result[0].height).toBeGreaterThanOrEqual(result[1].height);
		});

		it('should get row count', async () => {
			const count = await testTable.count();
			expect(count).toBe(2);
		});

		it('should get row count using whereIn', async () => {
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([emptyBlock, nonEmptyBlock], trx);
			await commitDBTransaction(trx);

			const params = {
				whereIn: [{
					property: 'height',
					values: [emptyBlock.height, nonEmptyBlock.height],
				},
				{
					property: 'id',
					values: [emptyBlock.id],
				}],
			};
			const result = await testTable.count(params);
			expect(result).toBe(1);
		});

		it('should get row count of column using whereIn', async () => {
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([emptyBlock, nonEmptyBlock], trx);
			await commitDBTransaction(trx);

			const params = {
				whereIn: [{
					property: 'height',
					values: [emptyBlock.height, nonEmptyBlock.height],
				},
				{
					property: 'id',
					values: [emptyBlock.id],
				}],
			};
			const result = await testTable.count(params, 'height');
			expect(result).toBe(1);
		});

		it('should get row count', async () => {
			const count = await testTable.count({ id: 'not_existing_id' });
			expect(count).toEqual(0);
		});

		it('should increment column value', async () => {
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.increment({
				increment: { timestamp: 5 },
				where: { id: emptyBlock.id },
			}, trx);
			await commitDBTransaction(trx);
			const [retrievedBlock] = await testTable.find({ id: emptyBlock.id }, ['timestamp']);
			expect(retrievedBlock).toBeTruthy();
			expect(retrievedBlock.timestamp).toBe(5 + emptyBlock.timestamp);
		});

		it('should decrement row by primary key', async () => {
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			const [existingBlock] = await testTable.find();
			const existingBlockId = existingBlock[`${schema.primaryKey}`];
			const numAffectedRows = await testTable.deleteByPrimaryKey([existingBlockId], trx);
			await commitDBTransaction(trx);
			expect(numAffectedRows).toEqual(1);

			const count = await testTable
				.count({ [schema.primaryKey]: existingBlock[schema.primaryKey] });
			expect(count).toBe(0);
		});

		it('should delete rows', async () => {
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);

			await testTable.upsert([emptyBlock, nonEmptyBlock]);
			const existingBlock = await testTable.find({}, ['id']);
			const existingBlockCount = await testTable.count();

			const existingIds = existingBlock.map(block => block.id);
			const numAffectedRows = await testTable.delete({ whereIn: { property: 'id', values: existingIds } }, trx);
			await commitDBTransaction(trx);

			expect(numAffectedRows).toEqual(existingBlockCount);

			const count = await testTable.count({});
			expect(count).toBe(0);
		});

		it('should delete a row using id', async () => {
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);

			await testTable.upsert([emptyBlock]);
			const existingBlock = await testTable.find({}, ['id']);
			const existingBlockCount = await testTable.count();

			const existingId = existingBlock.map(block => block.id);
			const numAffectedRows = await testTable.delete({ whereIn: { property: 'id', values: existingId } }, trx);
			await commitDBTransaction(trx);

			expect(numAffectedRows).toEqual(existingBlockCount);

			const count = await testTable.count({});
			expect(count).toBe(0);
		});

		it('should perform batch row insert', async () => {
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([emptyBlock, nonEmptyBlock], trx);
			await commitDBTransaction(trx);
			const result = await testTable.find();
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(2);
		});

		it('should perform distinct query', async () => {
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([emptyBlock, { ...nonEmptyBlock, id: emptyBlock.id }], trx);
			await commitDBTransaction(trx);
			const result = await testTable.find();
			const distinctResult = await testTable.find({ distinct: 'id' }, 'id');
			expect(result.length).toBeGreaterThan(distinctResult.length);
		});

		it('should perform update method', async () => {
			const [retrievedBlock] = await testTable.find({ id: emptyBlock.id }, ['timestamp']);
			expect(retrievedBlock.timestamp).toBe(emptyBlock.timestamp);

			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);

			const params = {
				where: { height: emptyBlock.height },
				updates: { timestamp: emptyBlock.timestamp + 1000 },
			};

			await testTable.update(params, trx);
			await commitDBTransaction(trx);

			const [retrievedBlock1] = await testTable.find({ id: emptyBlock.id }, ['timestamp']);
			expect(retrievedBlock1.timestamp).toBe(params.updates.timestamp);
		});

		it('should get rows using whereIn', async () => {
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([emptyBlock, nonEmptyBlock], trx);
			await commitDBTransaction(trx);

			const params = {
				whereIn: [{
					property: 'height',
					values: [emptyBlock.height, nonEmptyBlock.height],
				},
				{
					property: 'id',
					values: [emptyBlock.id],
				}],
			};
			const result = await testTable.find(params, ['id']);
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(1);

			const [retrievedBlock] = result;
			expect(retrievedBlock.id).toBe(emptyBlock.id);
		});

		it('should return records matching the superset of payload', async () => {
			// Insert a test record.
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([nonEmptyBlock], trx);
			await commitDBTransaction(trx);

			// Construct the query parameters.
			const params = {
				whereJsonSupersetOf: {
					property: 'payload',
					values: [nonEmptyBlock.payload[0]],
				},
			};

			// Perform the query.
			const result = await testTable.find(params, ['id']);

			// Assert the result.
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(1);
			const [retrievedBlock] = result;
			expect(retrievedBlock.id).toBe(nonEmptyBlock.id);
		});

		it('should not return any records when there is no match in payload', async () => {
			// Insert a test record.
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([emptyBlock, nonEmptyBlock], trx);
			await commitDBTransaction(trx);

			// Construct the query parameters.
			const params = {
				whereJsonSupersetOf: {
					property: 'payload',
					values: [{ invalidPayload: 1 }],
				},
			};

			// Perform the query.
			const result = await testTable.find(params, ['id']);

			// Assert the result.
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(0);
		});

		it('should return records if any one of the provided values are present in payload', async () => {
			// Insert a test record.
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([emptyBlock, nonEmptyBlock], trx);
			await commitDBTransaction(trx);

			// Construct the query parameters.
			const params = {
				whereJsonSupersetOf: {
					property: 'payload',
					values: [nonEmptyBlock.payload[0], { invalidPayload: 1 }],
				},
			};

			// Perform the query.
			const result = await testTable.find(params, ['id']);

			// Assert the result.
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(1);
			const [retrievedBlock] = result;
			expect(retrievedBlock.id).toBe(nonEmptyBlock.id);
		});

		it('should not return records if all of the provided values are not present in payload', async () => {
			// Insert a test record.
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([emptyBlock, nonEmptyBlock], trx);
			await commitDBTransaction(trx);

			// Construct the query parameters.
			const params = {
				whereJsonSupersetOf: {
					property: 'payload',
					values: [{ invalidPayload: 1 }, { invalidPayload: 2 }],
				},
			};

			// Perform the query.
			const result = await testTable.find(params, ['id']);

			// Assert the result.
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(0);
		});

		it('should return records if any of the provided values are present in metadata', async () => {
			// Insert a test record.
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([emptyBlock, nonEmptyBlock], trx);
			await commitDBTransaction(trx);

			// Construct the query parameters.
			const params = {
				whereJsonSupersetOf: {
					property: 'payload',
					values: [nonEmptyBlock.payload[0], nonEmptyBlock.payload[1], nonEmptyBlock.payload[2]],
				},
			};

			// Perform the query.
			const result = await testTable.find(params, ['id']);

			// Assert the result.
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(1);
			const [retrievedBlock] = result;
			expect(retrievedBlock.id).toBe(nonEmptyBlock.id);
		});
	});

	describe('Transactional atomicity guarantees (non-auto commit mode)', () => {
		it('should perform a successful transaction commit', async () => {
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([emptyBlock], trx);
			await testTable.upsert([{ ...emptyBlock, size: 50 }], trx);

			// Expect all operations to be successful, commit the transaction
			await commitDBTransaction(trx);

			// Verify committed transaction has been successful
			const [retrievedBlock] = await testTable.find({ id: emptyBlock.id }, ['id', 'size']);
			expect(retrievedBlock.id).toBe(emptyBlock.id);
			expect(retrievedBlock.size).toBe(50);
		});

		it('should find a row before committing the transaction', async () => {
			// Delete original entry if exists
			await testTable.deleteByPrimaryKey([emptyBlock.height]);
			let [retrievedBlock] = await testTable.find({ id: emptyBlock.id }, ['id', 'size']);
			expect(retrievedBlock).toBe(undefined);

			// Create a new transaction and add an entry
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([emptyBlock], trx);
			await testTable.upsert([{ ...emptyBlock, size: 50 }], trx);

			// get the entry before commiting the transaction
			[retrievedBlock] = await testTable.find({ id: emptyBlock.id }, ['id', 'size'], trx);
			expect(retrievedBlock.id).toBe(emptyBlock.id);
			expect(retrievedBlock.size).toBe(50);

			// Expect all operations to be successful, commit the transaction
			await commitDBTransaction(trx);

			// get the entry after commiting the transaction
			[retrievedBlock] = await testTable.find({ id: emptyBlock.id }, ['id', 'size']);
			expect(retrievedBlock.id).toBe(emptyBlock.id);
			expect(retrievedBlock.size).toBe(50);
		});

		it('should perform a successful transaction rollback - 1', async () => {
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([{ ...emptyBlock, id: 'rollback' }], trx);
			await testTable.increment({
				increment: { size: 100 },
				where: { id: 'rollback' },
			}, trx);

			// Assume failure occurred, rollback the transaction
			await rollbackDBTransaction(trx);

			// Verify none of the above operations have been committed
			const [retrievedBlock] = await testTable.find({ id: 'rollback' }, ['id']);
			expect(retrievedBlock).toBeUndefined();
		});

		it('should perform a successful transaction rollback - 2', async () => {
			const height = 14555;
			const connection = await getDBConnection();
			const trx1 = await startDBTransaction(connection);
			const trx2 = await startDBTransaction(connection);
			await testTable.upsert([{ ...emptyBlock, height }], trx1);
			await commitDBTransaction(trx1);

			// Start a new transaction, perform upsert/delete and rollback
			await testTable
				.upsert([{ ...emptyBlock, height, timestamp: emptyBlock.timestamp + 100 }], trx2);
			const numRowsAffected = await testTable.deleteByPrimaryKey([height], trx2);
			expect(numRowsAffected).toEqual(1);

			await rollbackDBTransaction(trx2);

			// The row must still be available
			const [retrievedBlock2] = await testTable.find({ height }, ['height', 'timestamp']);
			expect(retrievedBlock2.height).toBe(height);
			expect(retrievedBlock2.timestamp).toBe(emptyBlock.timestamp);
		});

		it('should throw an error when performing additional operations on a committed transaction', async () => {
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([emptyBlock], trx);
			await testTable.upsert([{ ...emptyBlock, size: 50 }], trx);

			// Expect all operations to be successful, commit the transaction
			await commitDBTransaction(trx);

			// Perform upsert using committed transaction
			expect(testTable.upsert([{ ...emptyBlock, id: 'same transaction' }], trx)).rejects.toThrow();
		});

		it('should throw an error when performing additional operations on a rollback transaction', async () => {
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([emptyBlock], trx);
			await testTable.upsert([{ ...emptyBlock, size: 50 }], trx);

			// Assume failure occurred, rollback the transaction
			await rollbackDBTransaction(trx);

			// Perform upsert using rollback transaction
			expect(testTable.upsert([{ ...emptyBlock, id: 'same transaction' }], trx)).rejects.toThrow();
		});

		it('should have no effect when rolling back a committed transaction', async () => {
			const connection = await getDBConnection();
			const trx = await startDBTransaction(connection);
			await testTable.upsert([emptyBlock], trx);
			await testTable.upsert([{ ...emptyBlock, size: 50 }], trx);

			// Expect all operations to be successful, commit the transaction
			await commitDBTransaction(trx);
			expect(rollbackDBTransaction(trx)).resolves.toBeUndefined();
		});
	});
});