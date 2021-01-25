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
const config = require('../../../config');

const tableName = config.db.collections.transactions.name;

exports.up = knex => knex.schema
    .createTable(tableName, table => {
        // Indexed properties
        table.string('id').primary();
        table.integer('height').notNullable().index();
        table.string('moduleAssetsId').notNullable().index();
        table.string('moduleAssetsName').index();
        table.string('nonce').notNullable().index();
        table.string('blockId').index();
        table.integer('timestamp').index();
        table.string('senderId').index();
        table.string('senderPublicKey').index();
        table.string('senderUsername').index();
        table.string('recipientId').index();
        table.string('recipientPublicKey').index();
        table.string('recipientUsername').index();

        // Non-indexed properties
        table.string('signatures');
        table.integer('confirmations');
        // table.string('asset');
        table.string('amount');
        table.string('fee');
    });

exports.down = knex => knex.schema.dropTable(tableName);

exports.config = { transaction: false };
