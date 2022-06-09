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
const { Signals } = require('lisk-service-framework');

const { getRegisteredEvents } = require('../../shared/sdk/endpoints');
const { subscribeToAllRegisteredEvents } = require('../../shared/sdk/events');
const { decodeEventPayload } = require('../../shared/sdk/decoder');

const toCamelCase = (words) => {
	let result = '';
	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		const formattedWord = (i !== 0)
			? word.substr(0, 1).toUpperCase() + word.substr(1)
			: word.toLowerCase();
		result = result.concat(formattedWord);
	}
	return result;
};

const exportAllEvents = async () => {
	// Re-subscribe to the events when apiClient is re-instantiated
	Signals.get('newApiClient').add(subscribeToAllRegisteredEvents);
	await subscribeToAllRegisteredEvents();

	const registeredEvents = await getRegisteredEvents();
	const allMethods = registeredEvents.map(event => {
		const genericController = (regEvent) => (cb) => {
			const eventListener = async (payload) => {
				Signals.get(toCamelCase(regEvent.split('_'))).dispatch(payload);
				const decodedEvent = decodeEventPayload(regEvent, payload);
				cb(decodedEvent);
			};
			Signals.get(regEvent).add(eventListener);
		};
		const controller = genericController(event);

		return {
			name: event,
			description: `Event: ${event}`,
			controller,
		};
	});

	return allMethods;
};

module.exports = exportAllEvents();