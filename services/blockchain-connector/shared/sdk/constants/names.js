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
// Generic
const EVENT_NAME_COMMAND_EXECUTION_RESULT = 'commandExecutionResult';

// Auth
const MODULE_NAME_AUTH = 'auth';
const EVENT_NAME_MULTISIGNATURE_REGISTERED = 'multisignatureRegistration';
const EVENT_NAME_INVALID_SIGNATURE = 'invalidSignature';

// Validators
const MODULE_NAME_VALIDATORS = 'validators';
const EVENT_NAME_GENERATOR_KEY_REGISTRATION = 'generatorKeyRegistration';
const EVENT_NAME_BLS_KEY_REGISTRATION = 'blsKeyRegistration';

// Token
const MODULE_NAME_TOKEN = 'token';
const EVENT_NAME_TRANSFER = 'transfer';
const EVENT_NAME_TRANSFER_CROSS_CHAIN = 'transferCrossChain';
const EVENT_NAME_CCM_TRANSFER = 'ccmTransfer';
const EVENT_NAME_MINT = 'mint';
const EVENT_NAME_BURN = 'burn';
const EVENT_NAME_LOCK = 'lock';
const EVENT_NAME_UNLOCK = 'unlock';
const EVENT_NAME_INITIALIZE_TOKEN = 'initializeToken';
const EVENT_NAME_INITIALIZE_USER_ACCOUNT = 'initializeUserAccount';
const EVENT_NAME_INITIALIZE_ESCROW_ACCOUNT = 'initializeEscrowAccount';
const EVENT_NAME_RECOVER = 'recover';
const EVENT_NAME_BEFORE_CCC_EXECUTION = 'beforeCCCExecution';
const EVENT_NAME_BEFORE_CCM_FORWARDING = 'beforeCCMForwarding';
const EVENT_NAME_ALL_TOKENS_SUPPORTED = 'allTokensSupported';
const EVENT_NAME_ALL_TOKENS_SUPPORT_REMOVED = 'allTokensSupportRemoved';
const EVENT_NAME_ALL_TOKENS_FROM_CHAIN_SUPPORTED = 'allTokensFromChainSupported';
const EVENT_NAME_ALL_TOKENS_FROM_CHAIN_SUPPORT_REMOVED = 'allTokensFromChainSupportRemoved';
const EVENT_NAME_TOKEN_ID_SUPPORTED = 'tokenIDSupported';
const EVENT_NAME_TOKEN_ID_SUPPORT_REMOVED = 'tokenIDSupportRemoved';

// Fee
const MODULE_NAME_FEE = 'fee';
const EVENT_NAME_FEE_PROCESSED = 'generatorFeeProcessed';
const EVENT_NAME_INSUFFICIENT_FEE = 'insufficientFee';
const EVENT_NAME_RELAYER_FEE_PROCESSED = 'relayerFeeProcessed';

// Interoperability
const MODULE_NAME_INTEROPERABILITY = 'interoperability';
const EVENT_NAME_INVALID_CERTIFICATE_SIGNATURE = 'invalidCertificateSignature';
const EVENT_NAME_INVALID_REGISTRATION_SIGNATURE = 'invalidRegistrationSignature';
const EVENT_NAME_CHAIN_ACCOUNT_UPDATED = 'chainAccountUpdated';
const EVENT_NAME_CCM_SENT_SUCCESS = 'ccmSendSuccess';
const EVENT_NAME_CCM_SENT_FAILED = 'ccmSentFailed';
const EVENT_NAME_CCM_PROCESSED = 'ccmProcessed';
const EVENT_NAME_TERMINATED_STATE_CREATED = 'terminatedStateCreated';
const EVENT_NAME_TERMINATED_OUTBOX_CREATED = 'terminatedOutboxCreated';

// PoS
const MODULE_NAME_POS = 'pos';
const EVENT_NAME_VALIDATOR_REGISTERED = 'validatorRegistered';
const EVENT_NAME_VALIDATOR_STAKED = 'validatorStaked';
const EVENT_NAME_VALIDATOR_PUNISHED = 'validatorPunished';
const EVENT_NAME_VALIDATOR_BANNED = 'validatorBanned';
const EVENT_NAME_COMMISSION_CHANGE = 'commissionChange';
const EVENT_NAME_REWARDS_ASSIGNED = 'rewardsAssigned';

// Random
const MODULE_NAME_RANDOM = 'random';

// (Dynamic) Block Rewards
const MODULE_NAME_BLOCK_REWARDS = 'reward';
const MODULE_NAME_DYNAMIC_BLOCK_REWARDS = 'dynamicReward';
const EVENT_NAME_REWARD_MINTED = 'rewardMinted';

// Legacy
const MODULE_NAME_LEGACY = 'legacy';
const EVENT_NAME_ACCOUNT_RECLAIMED = 'accountReclaimed';
const EVENT_NAME_KEYS_REGISTERED = 'keysRegistered';

// Subscription
const MODULE_NAME_SUBSCRIPTION = 'subscription';
const EVENT_NAME_SUBSCRIPTION_CREATED = 'subscriptionCreated';
const EVENT_NAME_SUBSCRIPTION_PURCHASED = 'subscriptionPurchased';

// Collection
const MODULE_NAME_COLLECTION = 'collection';
const EVENT_NAME_COLLECTION_CREATED = 'collectionCreated';
const EVENT_NAME_COLLECTION_TRANSFERED = 'collectionTransfered';

// Audios
const MODULE_NAME_AUDIO = 'audio';
const EVENT_NAME_AUDIO_CREATED = 'audioCreated';
const EVENT_NAME_AUDIO_STREAMED = 'audioStreamed';
const EVENT_NAME_AUDIO_INCOME_RECLAIMED = 'audioIncomeReclaimed';

// Profiles
const MODULE_NAME_PROFILE = 'profile';
const EVENT_NAME_PROFILE_CREATED = 'profileCreated';

module.exports = {
	MODULE_NAME_AUTH,
	EVENT_NAME_INVALID_SIGNATURE,
	EVENT_NAME_MULTISIGNATURE_REGISTERED,

	MODULE_NAME_VALIDATORS,
	EVENT_NAME_GENERATOR_KEY_REGISTRATION,
	EVENT_NAME_BLS_KEY_REGISTRATION,

	MODULE_NAME_TOKEN,
	EVENT_NAME_TRANSFER,
	EVENT_NAME_TRANSFER_CROSS_CHAIN,
	EVENT_NAME_CCM_TRANSFER,
	EVENT_NAME_MINT,
	EVENT_NAME_BURN,
	EVENT_NAME_LOCK,
	EVENT_NAME_UNLOCK,
	EVENT_NAME_INITIALIZE_TOKEN,
	EVENT_NAME_INITIALIZE_USER_ACCOUNT,
	EVENT_NAME_INITIALIZE_ESCROW_ACCOUNT,
	EVENT_NAME_RECOVER,
	EVENT_NAME_BEFORE_CCC_EXECUTION,
	EVENT_NAME_BEFORE_CCM_FORWARDING,
	EVENT_NAME_ALL_TOKENS_SUPPORTED,
	EVENT_NAME_ALL_TOKENS_SUPPORT_REMOVED,
	EVENT_NAME_ALL_TOKENS_FROM_CHAIN_SUPPORTED,
	EVENT_NAME_ALL_TOKENS_FROM_CHAIN_SUPPORT_REMOVED,
	EVENT_NAME_TOKEN_ID_SUPPORTED,
	EVENT_NAME_TOKEN_ID_SUPPORT_REMOVED,
	EVENT_NAME_COMMAND_EXECUTION_RESULT,

	MODULE_NAME_FEE,
	EVENT_NAME_FEE_PROCESSED,
	EVENT_NAME_INSUFFICIENT_FEE,
	EVENT_NAME_RELAYER_FEE_PROCESSED,

	MODULE_NAME_INTEROPERABILITY,
	EVENT_NAME_INVALID_CERTIFICATE_SIGNATURE,
	EVENT_NAME_INVALID_REGISTRATION_SIGNATURE,
	EVENT_NAME_CHAIN_ACCOUNT_UPDATED,
	EVENT_NAME_CCM_SENT_SUCCESS,
	EVENT_NAME_CCM_SENT_FAILED,
	EVENT_NAME_CCM_PROCESSED,
	EVENT_NAME_TERMINATED_STATE_CREATED,
	EVENT_NAME_TERMINATED_OUTBOX_CREATED,

	MODULE_NAME_POS,
	EVENT_NAME_VALIDATOR_REGISTERED,
	EVENT_NAME_VALIDATOR_STAKED,
	EVENT_NAME_VALIDATOR_PUNISHED,
	EVENT_NAME_VALIDATOR_BANNED,
	EVENT_NAME_COMMISSION_CHANGE,
	EVENT_NAME_REWARDS_ASSIGNED,

	MODULE_NAME_RANDOM,

	MODULE_NAME_BLOCK_REWARDS,
	MODULE_NAME_DYNAMIC_BLOCK_REWARDS,
	EVENT_NAME_REWARD_MINTED,

	MODULE_NAME_LEGACY,
	EVENT_NAME_ACCOUNT_RECLAIMED,
	EVENT_NAME_KEYS_REGISTERED,

	MODULE_NAME_SUBSCRIPTION,
	EVENT_NAME_SUBSCRIPTION_CREATED,
	EVENT_NAME_SUBSCRIPTION_PURCHASED,

	MODULE_NAME_COLLECTION,
	EVENT_NAME_COLLECTION_CREATED,
	EVENT_NAME_COLLECTION_TRANSFERED,

	MODULE_NAME_AUDIO,
	EVENT_NAME_AUDIO_CREATED,
	EVENT_NAME_AUDIO_STREAMED,
	EVENT_NAME_AUDIO_INCOME_RECLAIMED,

	MODULE_NAME_PROFILE,
	EVENT_NAME_PROFILE_CREATED,
};
