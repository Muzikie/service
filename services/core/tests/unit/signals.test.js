
/*
 * LiskHQ/lisk-service
 * Copyright © 2021 Lisk Foundation
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
const signals = require('../../shared/signals');

describe('Signals tests', () => {
    let signal;
    const tesFunc = () => { };
    beforeEach(async () => {
        signal = signals.register('mockEvent');
    });

    describe('Test cases for signal.add()', () => {
        it('Add valid listener to signal.add()', async () => {
            // initially 0 listeners
            expect(signal.getNumListeners()).toBe(0);

            // Add 1 listener to signals
            signal.add(tesFunc);
            expect(signal.getNumListeners()).toBe(1);
        });

        it('Add invalid listener to signal.add() throws an error', async () => {
            try {
                signal.add();
            } catch (err) {
                expect(err.message).toEqual('listener is a required param of add() and should be a Function.');
            }
        });
    });
});
