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
const genesisBlock = {
	jsonrpc: '2.0',
	result: {
		data: [
			{
				id: '913c05af34a7f1cc40be1e388ca4878fa7b34026a9514b4f299b3d42a6f82b54',
				height: 14075260,
				version: 0,
				timestamp: 1625160940,
				generatorAddress: null,
				generatorPublicKey: '',
				generatorUsername: null,
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: '',
				previousBlockId: 'ce284b6652e18a921d7362210e785bdb92934184e5c4cadb0e6362cc9bb90ee7',
				numberOfTransactions: 0,
				totalForged: '0',
				totalBurnt: '0',
				totalFee: '0',
				reward: '0',
				isFinal: true,
			},
		],
		meta: {
			count: 1,
			offset: 0,
			total: 1,
		},
	},
	id: 1,
};

const blockByHeight = {
	jsonrpc: '2.0',
	result: {
		data: [
			{
				id: '031707e6ab3803be00754f64ef821ebb8a29fbec4bd9b8057f160bbe06ebe7ed',
				height: 14210775,
				version: 2,
				timestamp: 1627389260,
				generatorAddress: 'lsksdruzggrpopgbdchkx4558o585y4jbqe4bgwhc',
				generatorPublicKey: '67975617d07d3084b456c82716f8b4c2016c088c31434778947d78a19970a7fc',
				generatorUsername: 'g1zm0',
				transactionRoot: '4c2954bdffd609f2e1ece926b71aeca6611021e353e50e581a1d980f2b4f2c88',
				signature: '75782beb637483855db5ae364ba7b4d9185d55b327944b5d1c54c3edfb1c1e7007003edbbb13614c1aefb7c453df0d03120acfbf67422e3e5c5191b8871dfd02',
				previousBlockId: '46f119f6b44512a04a810d94f221ce862abe6909f579c6965f0b4c89f6f6d5af',
				numberOfTransactions: 1,
				totalForged: '100142000',
				totalBurnt: '142000',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14210625,
				maxHeightPrevoted: 14210707,
				seedReveal: 'c096d1b3374bf7a8212ab4c3daf7bcfb',
			},
		],
		meta: {
			count: 1,
			offset: 0,
			total: 1,
		},
	},
	id: 1,
};

const blocksBetweenHeight = {
	jsonrpc: '2.0',
	result: {
		data: [
			{
				id: '7f7854cecf1a9be7693bc7c6e40127db927c347036dc1032fe0a6450951c0af0',
				height: 14210765,
				version: 2,
				timestamp: 1627389150,
				generatorAddress: 'lskf7w55a4msjushuo5xebna3xohu4tfttbw7mokr',
				generatorPublicKey: '76e9db401813af522c824551d8372ec9a119be3e3dd57d2ee0541d9843f1b514',
				generatorUsername: 'shuse11',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: 'c6f74cd016c3b44a7bdda65d9b7d6e4f3b7cf6c96984a9d07a31bebe2d54a8829775719c7ebe6f30a6dfa314de41f332d68884f7e40fb93c7aa950ae2d6bbd00',
				previousBlockId: '4afc926248f5ab79144fecec18d56a5d2acedf2b489f811cfad938cf75e9c6d6',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14210627,
				maxHeightPrevoted: 14210676,
				seedReveal: '1f22bc0a265a84bbcf4507bba1d84877',
			},
			{
				id: '4afc926248f5ab79144fecec18d56a5d2acedf2b489f811cfad938cf75e9c6d6',
				height: 14210764,
				version: 2,
				timestamp: 1627389140,
				generatorAddress: 'lsko59odftdnwu7ma7g3z37zsd3z7ztwx4n8u9rcs',
				generatorPublicKey: '8f2ae5a4fa63ecdd53aa85711ac0a14f2d9a42451838ebfcf5999c5cf5eded06',
				generatorUsername: 'mrgr',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: '05237df4259354ca579d3efbec9abd2a2a9dbf3e684e3263e62d99dc91fd358aeb87af3b278f6b1e61f0c5330f65dd0ba6621716912bcbd38fd59a33fef46309',
				previousBlockId: 'fd56acbde025cf6141822e86bd1f3fcc83876f2dd33330658db9a88b8530d96c',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14210652,
				maxHeightPrevoted: 14210673,
				seedReveal: 'a9476decf2cd9fd03cef8243776e17c0',
			},
			{
				id: 'fd56acbde025cf6141822e86bd1f3fcc83876f2dd33330658db9a88b8530d96c',
				height: 14210763,
				version: 2,
				timestamp: 1627389130,
				generatorAddress: 'lsk3ynkdj3dauwkydhc9qsvybathsv2wwvmnoxcw7',
				generatorPublicKey: '473c354cdf627b82e9113e02a337486dd3afc5615eb71ffd311c5a0beda37b8c',
				generatorUsername: 'cc001',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: 'bd762d594f3fb11b21d6ef14f23cac0702861c7739d132b5beb5f2386d70f7f0d98af1bc5008088cc9481c2aaa9000fb0cd48fc52a9dcbbeb00c92a673d94104',
				previousBlockId: '57a7cfc4561d54183bd0ac0e2f49402741a5a38b88ad13db76a04f1f779be323',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14210641,
				maxHeightPrevoted: 14210669,
				seedReveal: '7400884315df50c7b1141d361da25b02',
			},
			{
				id: '57a7cfc4561d54183bd0ac0e2f49402741a5a38b88ad13db76a04f1f779be323',
				height: 14210762,
				version: 2,
				timestamp: 1627389120,
				generatorAddress: 'lskq5ma8otnjrytqn2eawa8sewp5yr64tg8cmcew6',
				generatorPublicKey: 'f88b86d0a104bda71b2ff4d8234fef4e184ee771a9c2d3a298280790c185231b',
				generatorUsername: 'kushed.test',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: '927e19896d3151ad8d141d232acc83601905cbfd5cb7c6e3a30d346aae3f4d52a43a89d9c0ee1820ca7f98d861f40b67e185a00a44890cb81a05b043abc64504',
				previousBlockId: 'db90549e0fdb079e7378cb025272e28184a165f4b8e9e7dea2ae05cd9899c5e1',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14210680,
				maxHeightPrevoted: 14210669,
				seedReveal: '7c02575bce29d28ea6b281433d798534',
			},
			{
				id: 'db90549e0fdb079e7378cb025272e28184a165f4b8e9e7dea2ae05cd9899c5e1',
				height: 14210761,
				version: 2,
				timestamp: 1627389110,
				generatorAddress: 'lsk5m9rom3p9rwzbdr32my6fpzeykjz8jzwqrzhgq',
				generatorPublicKey: '73610223b318f69033acad396762b49f511c779152a5213046591537dcbfb2c6',
				generatorUsername: 'shuse5',
				transactionRoot: '2b324a5f6a2ed8668754227d3fafca108e75a895ee328ed7e55ba5a6bd3ed0a0',
				signature: 'b1b28d5dd0bdba8ae1fc192b647fbbeabcbec7dc4b7446cf32fa16f2083b01a1212a8e11bd5b49dffdd2f157fe34bfb7f3db066701014a0cb4feb184790c690c',
				previousBlockId: '6112f8c5a567ba975a5bc1dda9d4cea34785b8d5827e41821bca0008166dc8f9',
				numberOfTransactions: 1,
				totalForged: '100142000',
				totalBurnt: '142000',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14210693,
				maxHeightPrevoted: 14210669,
				seedReveal: 'e0ee4a6b8d6efb2aa9a75b0c4300b573',
			},
			{
				id: '6112f8c5a567ba975a5bc1dda9d4cea34785b8d5827e41821bca0008166dc8f9',
				height: 14210760,
				version: 2,
				timestamp: 1627389100,
				generatorAddress: 'lskz3emck85sy9qp2nepcskkpsu233o3p3mkzt2tf',
				generatorPublicKey: '3c975d6c7c6decf3f783f8cb98837ca48ccc3dc40481e5b5b6bd6185c9289ac1',
				generatorUsername: 'shuse15',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: 'ab1efbeb7d8186bb1bd29062abd3cbf6be571c342f1e596945b44e8bfb1973db1b2ae4ef71ac782b621ff4968369b7f4d259e646b26778a4654d5738229e660c',
				previousBlockId: '1bb6639d37b9bc80ae59d1e0b8d97961cc08c0f475820c4cc2ab39df8dd2a978',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14210698,
				maxHeightPrevoted: 14210669,
				seedReveal: '6113f2e1b124a500e67a33d6635db49a',
			},
			{
				id: '1bb6639d37b9bc80ae59d1e0b8d97961cc08c0f475820c4cc2ab39df8dd2a978',
				height: 14210759,
				version: 2,
				timestamp: 1627389090,
				generatorAddress: 'lskhhgh24ut68p7brm8gcn58nahe8jx5xvf96gy4v',
				generatorPublicKey: 'ad6fbbe0f62bfb934f4a510c24f59baf600dd8b8bfaa4b59944037c50873a481',
				generatorUsername: 'tester_of_lisk',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: '3453c90e7d7831ae98d8bf474f36953d6a0367f51beaf40a8c570fb027ed18571c07791ea0d2ffe7bcb9576d40d0a1448096a7491e34c364d6b7b6e4d70f1c0b',
				previousBlockId: '2eb50325ced9d59af2a977298bf8a0f6575de2454fe334e21b50d5335d450dd6',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14210694,
				maxHeightPrevoted: 14210669,
				seedReveal: '0417bd8e694600d7f17d25b5f7c4946b',
			},
			{
				id: '2eb50325ced9d59af2a977298bf8a0f6575de2454fe334e21b50d5335d450dd6',
				height: 14210758,
				version: 2,
				timestamp: 1627389080,
				generatorAddress: 'lskoyzqcqp6vsaontm94v29wrp4w2sgxjq4ydd262',
				generatorPublicKey: 'd9f693b5eaa83dc83d4e86e265a73c3699fff1ce4468446810ac2210e937567a',
				generatorUsername: 'shuse14',
				transactionRoot: 'd5fbc38a519051003df2b7d3be3e879985558d43491f1176d57a0a2afb205c00',
				signature: '4846db1428befd15334f47a07fd692ce94665adc4e864d804343dfe23417f06db9246bf6b5ce64435aa6fa768bb12e57c03e08626ce0d9008fd0ed55c3eec508',
				previousBlockId: '9b7a46f1e4318b2c9f613ba8ebd47936fbe7651af5d7a9fa46f1eba982bf55de',
				numberOfTransactions: 1,
				totalForged: '100145000',
				totalBurnt: '145000',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14210675,
				maxHeightPrevoted: 14210669,
				seedReveal: 'f4b2e8181c029cf3b9ecdf62cd8ece1c',
			},
			{
				id: '9b7a46f1e4318b2c9f613ba8ebd47936fbe7651af5d7a9fa46f1eba982bf55de',
				height: 14210757,
				version: 2,
				timestamp: 1627389070,
				generatorAddress: 'lsk5c9qrvh6m49zzpw4cskotbhsf5bdkbduqtm833',
				generatorPublicKey: 'bac9d0bc5438a1034238a7c12f542f704d78841efa67154845d1e5d687a7e011',
				generatorUsername: 'shuse16',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: 'af924ece9c4de05bf2d01ba1726aa3ed9edae0cc35862eb4e66320baf4e25703fca4e3d8491c98267043bdf994157f423752990bbb81ae4d5f7e65f46c9e6106',
				previousBlockId: '400d9f08a2746aba830e516bc79f9eac2e67eeaf689094ee57926996f5aee5ba',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14210628,
				maxHeightPrevoted: 14210667,
				seedReveal: '9d8d3641d9c37d4ae8e570732c61d151',
			},
			{
				id: '400d9f08a2746aba830e516bc79f9eac2e67eeaf689094ee57926996f5aee5ba',
				height: 14210756,
				version: 2,
				timestamp: 1627389060,
				generatorAddress: 'lskgaxpe8wcds39v9uhroa7vu98uq9v3neduw4ngy',
				generatorPublicKey: '51dc1928a140dc3dbcce2c4c89335d3acbd4140b414a168d8b47e8f4ffad6c4a',
				generatorUsername: 'liskpoland.pl',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: 'f84a2d855a55c163507da54c4c66d8d32619f1fd2561f0edf53502e52b6d4b6b2295cef8e2bb70d7c239c2acd0bbb07d562d8fec9f160420eb96fbabaf5a9c0f',
				previousBlockId: '64c37757ccf8ed36b22ab0523e8619e95712dc498641e2defd3d8be2ccb5eb0a',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14210666,
				maxHeightPrevoted: 14210666,
				seedReveal: '33d26831664dca7917596b12ea8c48ee',
			},
		],
		meta: {
			count: 10,
			offset: 0,
			total: 11,
		},
	},
	id: 1,
};

const blocksBetweenTimestamp = {
	jsonrpc: '2.0',
	result: {
		data: [
			{
				id: '7f7854cecf1a9be7693bc7c6e40127db927c347036dc1032fe0a6450951c0af0',
				height: 14210765,
				version: 2,
				timestamp: 1627389150,
				generatorAddress: 'lskf7w55a4msjushuo5xebna3xohu4tfttbw7mokr',
				generatorPublicKey: '76e9db401813af522c824551d8372ec9a119be3e3dd57d2ee0541d9843f1b514',
				generatorUsername: 'shuse11',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: 'c6f74cd016c3b44a7bdda65d9b7d6e4f3b7cf6c96984a9d07a31bebe2d54a8829775719c7ebe6f30a6dfa314de41f332d68884f7e40fb93c7aa950ae2d6bbd00',
				previousBlockId: '4afc926248f5ab79144fecec18d56a5d2acedf2b489f811cfad938cf75e9c6d6',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14210627,
				maxHeightPrevoted: 14210676,
				seedReveal: '1f22bc0a265a84bbcf4507bba1d84877',
			},
			{
				id: '4afc926248f5ab79144fecec18d56a5d2acedf2b489f811cfad938cf75e9c6d6',
				height: 14210764,
				version: 2,
				timestamp: 1627389140,
				generatorAddress: 'lsko59odftdnwu7ma7g3z37zsd3z7ztwx4n8u9rcs',
				generatorPublicKey: '8f2ae5a4fa63ecdd53aa85711ac0a14f2d9a42451838ebfcf5999c5cf5eded06',
				generatorUsername: 'mrgr',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: '05237df4259354ca579d3efbec9abd2a2a9dbf3e684e3263e62d99dc91fd358aeb87af3b278f6b1e61f0c5330f65dd0ba6621716912bcbd38fd59a33fef46309',
				previousBlockId: 'fd56acbde025cf6141822e86bd1f3fcc83876f2dd33330658db9a88b8530d96c',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14210652,
				maxHeightPrevoted: 14210673,
				seedReveal: 'a9476decf2cd9fd03cef8243776e17c0',
			},
			{
				id: 'fd56acbde025cf6141822e86bd1f3fcc83876f2dd33330658db9a88b8530d96c',
				height: 14210763,
				version: 2,
				timestamp: 1627389130,
				generatorAddress: 'lsk3ynkdj3dauwkydhc9qsvybathsv2wwvmnoxcw7',
				generatorPublicKey: '473c354cdf627b82e9113e02a337486dd3afc5615eb71ffd311c5a0beda37b8c',
				generatorUsername: 'cc001',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: 'bd762d594f3fb11b21d6ef14f23cac0702861c7739d132b5beb5f2386d70f7f0d98af1bc5008088cc9481c2aaa9000fb0cd48fc52a9dcbbeb00c92a673d94104',
				previousBlockId: '57a7cfc4561d54183bd0ac0e2f49402741a5a38b88ad13db76a04f1f779be323',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14210641,
				maxHeightPrevoted: 14210669,
				seedReveal: '7400884315df50c7b1141d361da25b02',
			},
			{
				id: '57a7cfc4561d54183bd0ac0e2f49402741a5a38b88ad13db76a04f1f779be323',
				height: 14210762,
				version: 2,
				timestamp: 1627389120,
				generatorAddress: 'lskq5ma8otnjrytqn2eawa8sewp5yr64tg8cmcew6',
				generatorPublicKey: 'f88b86d0a104bda71b2ff4d8234fef4e184ee771a9c2d3a298280790c185231b',
				generatorUsername: 'kushed.test',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: '927e19896d3151ad8d141d232acc83601905cbfd5cb7c6e3a30d346aae3f4d52a43a89d9c0ee1820ca7f98d861f40b67e185a00a44890cb81a05b043abc64504',
				previousBlockId: 'db90549e0fdb079e7378cb025272e28184a165f4b8e9e7dea2ae05cd9899c5e1',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14210680,
				maxHeightPrevoted: 14210669,
				seedReveal: '7c02575bce29d28ea6b281433d798534',
			},
			{
				id: 'db90549e0fdb079e7378cb025272e28184a165f4b8e9e7dea2ae05cd9899c5e1',
				height: 14210761,
				version: 2,
				timestamp: 1627389110,
				generatorAddress: 'lsk5m9rom3p9rwzbdr32my6fpzeykjz8jzwqrzhgq',
				generatorPublicKey: '73610223b318f69033acad396762b49f511c779152a5213046591537dcbfb2c6',
				generatorUsername: 'shuse5',
				transactionRoot: '2b324a5f6a2ed8668754227d3fafca108e75a895ee328ed7e55ba5a6bd3ed0a0',
				signature: 'b1b28d5dd0bdba8ae1fc192b647fbbeabcbec7dc4b7446cf32fa16f2083b01a1212a8e11bd5b49dffdd2f157fe34bfb7f3db066701014a0cb4feb184790c690c',
				previousBlockId: '6112f8c5a567ba975a5bc1dda9d4cea34785b8d5827e41821bca0008166dc8f9',
				numberOfTransactions: 1,
				totalForged: '100142000',
				totalBurnt: '142000',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14210693,
				maxHeightPrevoted: 14210669,
				seedReveal: 'e0ee4a6b8d6efb2aa9a75b0c4300b573',
			},
			{
				id: '6112f8c5a567ba975a5bc1dda9d4cea34785b8d5827e41821bca0008166dc8f9',
				height: 14210760,
				version: 2,
				timestamp: 1627389100,
				generatorAddress: 'lskz3emck85sy9qp2nepcskkpsu233o3p3mkzt2tf',
				generatorPublicKey: '3c975d6c7c6decf3f783f8cb98837ca48ccc3dc40481e5b5b6bd6185c9289ac1',
				generatorUsername: 'shuse15',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: 'ab1efbeb7d8186bb1bd29062abd3cbf6be571c342f1e596945b44e8bfb1973db1b2ae4ef71ac782b621ff4968369b7f4d259e646b26778a4654d5738229e660c',
				previousBlockId: '1bb6639d37b9bc80ae59d1e0b8d97961cc08c0f475820c4cc2ab39df8dd2a978',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14210698,
				maxHeightPrevoted: 14210669,
				seedReveal: '6113f2e1b124a500e67a33d6635db49a',
			},
			{
				id: '1bb6639d37b9bc80ae59d1e0b8d97961cc08c0f475820c4cc2ab39df8dd2a978',
				height: 14210759,
				version: 2,
				timestamp: 1627389090,
				generatorAddress: 'lskhhgh24ut68p7brm8gcn58nahe8jx5xvf96gy4v',
				generatorPublicKey: 'ad6fbbe0f62bfb934f4a510c24f59baf600dd8b8bfaa4b59944037c50873a481',
				generatorUsername: 'tester_of_lisk',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: '3453c90e7d7831ae98d8bf474f36953d6a0367f51beaf40a8c570fb027ed18571c07791ea0d2ffe7bcb9576d40d0a1448096a7491e34c364d6b7b6e4d70f1c0b',
				previousBlockId: '2eb50325ced9d59af2a977298bf8a0f6575de2454fe334e21b50d5335d450dd6',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14210694,
				maxHeightPrevoted: 14210669,
				seedReveal: '0417bd8e694600d7f17d25b5f7c4946b',
			},
			{
				id: '2eb50325ced9d59af2a977298bf8a0f6575de2454fe334e21b50d5335d450dd6',
				height: 14210758,
				version: 2,
				timestamp: 1627389080,
				generatorAddress: 'lskoyzqcqp6vsaontm94v29wrp4w2sgxjq4ydd262',
				generatorPublicKey: 'd9f693b5eaa83dc83d4e86e265a73c3699fff1ce4468446810ac2210e937567a',
				generatorUsername: 'shuse14',
				transactionRoot: 'd5fbc38a519051003df2b7d3be3e879985558d43491f1176d57a0a2afb205c00',
				signature: '4846db1428befd15334f47a07fd692ce94665adc4e864d804343dfe23417f06db9246bf6b5ce64435aa6fa768bb12e57c03e08626ce0d9008fd0ed55c3eec508',
				previousBlockId: '9b7a46f1e4318b2c9f613ba8ebd47936fbe7651af5d7a9fa46f1eba982bf55de',
				numberOfTransactions: 1,
				totalForged: '100145000',
				totalBurnt: '145000',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14210675,
				maxHeightPrevoted: 14210669,
				seedReveal: 'f4b2e8181c029cf3b9ecdf62cd8ece1c',
			},
			{
				id: '9b7a46f1e4318b2c9f613ba8ebd47936fbe7651af5d7a9fa46f1eba982bf55de',
				height: 14210757,
				version: 2,
				timestamp: 1627389070,
				generatorAddress: 'lsk5c9qrvh6m49zzpw4cskotbhsf5bdkbduqtm833',
				generatorPublicKey: 'bac9d0bc5438a1034238a7c12f542f704d78841efa67154845d1e5d687a7e011',
				generatorUsername: 'shuse16',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: 'af924ece9c4de05bf2d01ba1726aa3ed9edae0cc35862eb4e66320baf4e25703fca4e3d8491c98267043bdf994157f423752990bbb81ae4d5f7e65f46c9e6106',
				previousBlockId: '400d9f08a2746aba830e516bc79f9eac2e67eeaf689094ee57926996f5aee5ba',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14210628,
				maxHeightPrevoted: 14210667,
				seedReveal: '9d8d3641d9c37d4ae8e570732c61d151',
			},
			{
				id: '400d9f08a2746aba830e516bc79f9eac2e67eeaf689094ee57926996f5aee5ba',
				height: 14210756,
				version: 2,
				timestamp: 1627389060,
				generatorAddress: 'lskgaxpe8wcds39v9uhroa7vu98uq9v3neduw4ngy',
				generatorPublicKey: '51dc1928a140dc3dbcce2c4c89335d3acbd4140b414a168d8b47e8f4ffad6c4a',
				generatorUsername: 'liskpoland.pl',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: 'f84a2d855a55c163507da54c4c66d8d32619f1fd2561f0edf53502e52b6d4b6b2295cef8e2bb70d7c239c2acd0bbb07d562d8fec9f160420eb96fbabaf5a9c0f',
				previousBlockId: '64c37757ccf8ed36b22ab0523e8619e95712dc498641e2defd3d8be2ccb5eb0a',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14210666,
				maxHeightPrevoted: 14210666,
				seedReveal: '33d26831664dca7917596b12ea8c48ee',
			},
		],
		meta: {
			count: 10,
			offset: 0,
			total: 11,
		},
	},
	id: 1,
};

const blocksByGeneratorAddress = {
	jsonrpc: '2.0',
	result: {
		data: [
			{
				id: 'a05dc56089bc2080e23b441e963d252efb6657ab98d5091233808dd9025a2d27',
				height: 14195794,
				version: 2,
				timestamp: 1627207430,
				generatorAddress: 'lskf7w55a4msjushuo5xebna3xohu4tfttbw7mokr',
				generatorPublicKey: '76e9db401813af522c824551d8372ec9a119be3e3dd57d2ee0541d9843f1b514',
				generatorUsername: 'shuse11',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: '2066853ab7644cfaf0d7552cc04eedd2a7d72ffdb7f353a9ab6c428a0e839df3172d05212a888f1c39a08782e88730ed0dc71e882e10f80e72ed10838b165202',
				previousBlockId: '88f160e438c3449457bfda19f89021ca749d5b049b35b96e695bfedc092bf732',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 0,
				maxHeightPrevoted: 14183024,
				seedReveal: 'cc17b68824ac052040a0bad478c0e497',
			},
			{
				id: '8c303f4ebace8756d912280066e23b3ee9b7b5552444f80d7b53a67241288487',
				height: 14195902,
				version: 2,
				timestamp: 1627208840,
				generatorAddress: 'lskf7w55a4msjushuo5xebna3xohu4tfttbw7mokr',
				generatorPublicKey: '76e9db401813af522c824551d8372ec9a119be3e3dd57d2ee0541d9843f1b514',
				generatorUsername: 'shuse11',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: 'fa8c3903690117f7e6fd4b487b748d15793ef74b31a79ea653ffc44fa64170933c22b9baf24f2615ece1d60fa44f7c09edb8675b760b6b3c65ccb1a2d5ab5503',
				previousBlockId: '2ac6ba3f702cb2ba28d34beedc0b6b74c1e2b7d592836e9c669e883c2c6f2d2c',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14195794,
				maxHeightPrevoted: 14195820,
				seedReveal: '4173299d26d0a1e26a3e9fee85f37b67',
			},
			{
				id: 'a533bb6c7dec7aa5366ae71f356703cae8f42e0680f8a66d2d240a04402d1a89',
				height: 14196022,
				version: 2,
				timestamp: 1627210380,
				generatorAddress: 'lskf7w55a4msjushuo5xebna3xohu4tfttbw7mokr',
				generatorPublicKey: '76e9db401813af522c824551d8372ec9a119be3e3dd57d2ee0541d9843f1b514',
				generatorUsername: 'shuse11',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: '9de168a74f9236eed3b09c49fcad2fa10da41298286bf6fefb48ed776ae1664a3159132e6dd085c5f34ef4dc4438e8df1d5615be0dc899d145881367f4e3980f',
				previousBlockId: '220c4497677c95e85763507555493cf9f9e801c560cc8450fdf03dd02f4e746f',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14195902,
				maxHeightPrevoted: 14195921,
				seedReveal: '6e18109517e5867b2da2cba95236123f',
			},
			{
				id: 'cd59af8566aaf9d5b285eb5777b56b9b13002c4aa7a53e434351f083985577f8',
				height: 14196136,
				version: 2,
				timestamp: 1627211800,
				generatorAddress: 'lskf7w55a4msjushuo5xebna3xohu4tfttbw7mokr',
				generatorPublicKey: '76e9db401813af522c824551d8372ec9a119be3e3dd57d2ee0541d9843f1b514',
				generatorUsername: 'shuse11',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: '9af87a9429de2107baeaa9693df0ac21f7552927421212d65d38755696745e6a8715feaf6394af98c57f907d568d218af83ca257021f8e5edf7679aec1534306',
				previousBlockId: 'f66f756af1495761ecc503fcd563b4b5624a3a91a9fdfa1bfb2038afe51f6592',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14196022,
				maxHeightPrevoted: 14196043,
				seedReveal: 'f40aa017eaac934a30a652173ddfccb9',
			},
			{
				id: 'da9d34fc64d07426a2b2fdb1c15c6f90cd178d9e6e047111892c1a5b8fa04ca8',
				height: 14196234,
				version: 2,
				timestamp: 1627213040,
				generatorAddress: 'lskf7w55a4msjushuo5xebna3xohu4tfttbw7mokr',
				generatorPublicKey: '76e9db401813af522c824551d8372ec9a119be3e3dd57d2ee0541d9843f1b514',
				generatorUsername: 'shuse11',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: '4137bb31d0906867bc7cd787a0c75fec28147c6c874758ac79fdc3b654de5e5b1a21329e75c5cef08cc0d9948d82e9ea3d23d47b09ce8f994ce9bf5df76f9800',
				previousBlockId: '8cd8329cebc55186793a9e8d07c02a5196476694270323e1f39b3996af0c216e',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14196136,
				maxHeightPrevoted: 14196138,
				seedReveal: '15caf49c54e6e9c20f47c4dc73c6df5b',
			},
			{
				id: '4ed1d62ce7d4bd5dddf65e1a80fcd5aee90680feeac7926008e714175f3c1c14',
				height: 14196328,
				version: 2,
				timestamp: 1627214200,
				generatorAddress: 'lskf7w55a4msjushuo5xebna3xohu4tfttbw7mokr',
				generatorPublicKey: '76e9db401813af522c824551d8372ec9a119be3e3dd57d2ee0541d9843f1b514',
				generatorUsername: 'shuse11',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: '2696aab49eadbc49823288f765d6ac53591c145151e9caec0a624a3d8276375cbe36c4bd44d55194452d5c39c48101cb4fec36628adca39269a044564d373b0c',
				previousBlockId: '840d7752ae1bc5d52f5ed6baccc39bb8740babf31fc1d2a11ed17ca4f3e15960',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14196234,
				maxHeightPrevoted: 14196233,
				seedReveal: '190b1d771371e832515b878994a2216d',
			},
			{
				id: '6276ac622b648dd9ad58cf3a0aad18950086fbe9165dbed2ccd0c91d67f8019e',
				height: 14196467,
				version: 2,
				timestamp: 1627215960,
				generatorAddress: 'lskf7w55a4msjushuo5xebna3xohu4tfttbw7mokr',
				generatorPublicKey: '76e9db401813af522c824551d8372ec9a119be3e3dd57d2ee0541d9843f1b514',
				generatorUsername: 'shuse11',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: 'fce83f7818f6e4231e5422dcdf9f73985b11fb5407aba91830342e71e51d90ce483c06f7c42b5f6148fbf575fd83e886b886ce366ad4bd91853244bc30680d09',
				previousBlockId: 'a36612fb3dc22547adb52738cfbcaec1d4e34d41d4593c768d64a312a27fbffd',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14196328,
				maxHeightPrevoted: 14196399,
				seedReveal: '0590356522e9c71c08c50b2ee888f2dd',
			},
			{
				id: 'c4c0fd8b724855e1397278d23d18b80691ebb0152a93a0f870ccdabede9c193b',
				height: 14196571,
				version: 2,
				timestamp: 1627217270,
				generatorAddress: 'lskf7w55a4msjushuo5xebna3xohu4tfttbw7mokr',
				generatorPublicKey: '76e9db401813af522c824551d8372ec9a119be3e3dd57d2ee0541d9843f1b514',
				generatorUsername: 'shuse11',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: '78cf7a38fd81935ea87b49e65360adcfb05df6ff3fcd8464f8460c522b9683c600ff8242beb412aaf9185434362ace96fa6805fba01efc017e43b0876b5f590f',
				previousBlockId: '21238b170f6e95d1ba52f5175a7dd1235a789ca94c87f9f51eb9dd2b47edc0c3',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14196467,
				maxHeightPrevoted: 14196503,
				seedReveal: 'b1f8adf9f4f69a7d0b93a95e00c02b23',
			},
			{
				id: '5fb1cdc98b9e90cf58f839e89d24464cefad234189dd5da9ccc9e29a28d84335',
				height: 14196615,
				version: 2,
				timestamp: 1627217800,
				generatorAddress: 'lskf7w55a4msjushuo5xebna3xohu4tfttbw7mokr',
				generatorPublicKey: '76e9db401813af522c824551d8372ec9a119be3e3dd57d2ee0541d9843f1b514',
				generatorUsername: 'shuse11',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: 'c07e3586c7924726cec518761a09030ddade881e6928f9a163bbba42f51be8251430226cf2bb1415d0b060ca7734d963f0d46dc8e8f18d1cbff8e7a188248603',
				previousBlockId: 'fa5c49408c19efa535a08a1876ba7e50306575c2f9f63b457f0b61782d4c554f',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14196571,
				maxHeightPrevoted: 14196530,
				seedReveal: 'fc40dbfbb6ae5dd606e24f384e9d8d99',
			},
			{
				id: 'ba99f0dd61656f4bebe06d8562379ecd83c15374a97860c487c102c1baf9b1a7',
				height: 14196696,
				version: 2,
				timestamp: 1627218830,
				generatorAddress: 'lskf7w55a4msjushuo5xebna3xohu4tfttbw7mokr',
				generatorPublicKey: '76e9db401813af522c824551d8372ec9a119be3e3dd57d2ee0541d9843f1b514',
				generatorUsername: 'shuse11',
				transactionRoot: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
				signature: 'da8d6c59bbf5b2d42a5630becd0be27f1cdc872807e227a59097e043d4fd6932ef91a1ce7c449a9a30fd18e6af89ad9262723fe9c696c2cba068b3d5e3e16b00',
				previousBlockId: 'bdd7da50f26cdaf725ceca4b5c4c4f6b8eca049cbeec6a19f3b478052f2c99ec',
				numberOfTransactions: 0,
				totalForged: '100000000',
				totalBurnt: '0',
				totalFee: '0',
				reward: '100000000',
				isFinal: true,
				maxHeightPreviouslyForged: 14196615,
				maxHeightPrevoted: 14196628,
				seedReveal: 'ae7e875d7fe8ecb75b2111c9c66ed34f',
			},
		],
		meta: {
			count: 10,
			offset: 0,
			total: 3650,
		},
	},
	id: 1,
};

const blocksByGeneratorPublicKey = blocksByGeneratorAddress;

const blocksByGeneratorUsername = blocksByGeneratorAddress;

module.exports = {
	genesisBlock,
	blockByHeight,
	blocksBetweenHeight,
	blocksBetweenTimestamp,
	blocksByGeneratorAddress,
	blocksByGeneratorPublicKey,
	blocksByGeneratorUsername,
};
