const HDWalletProvider = require('truffle-hdwallet-provider');
require('dotenv').config();


module.exports = {
  networks: {
    local: {
      host: 'localhost',
      port: 9545,
      gas: 5000000,
      gasPrice: 5e9,
      network_id: '*',
    },
    ropsten: {
      // address: 0xf92aF5f84a78814b3DF212209B773267C821900d
      provider: function() {
        if (!process.env.POAP_ROPSTEN_PK) {
          console.error('POAP_ROPSTEN_PK env variable is needed');
          process.abort();
        }
        return new HDWalletProvider(
          process.env.POAP_ROPSTEN_PK,
          'https://ropsten.infura.io/v3/cf7a7eed37254ec4b95670607e76a917'
        );
      },
      gas: 5000000,
      gasPrice: 5e9,
      network_id: 3,
    },
    mainnet: {
      // address: 0xe583f95bF95d0883F94EfE844442C8bfc9dd7A7F
      provider: function() {
        if (!process.env.POAP_MAIN_PK) {
          console.error('POAP_MAIN_PK env variable is needed');
          process.abort();
        }
        return new HDWalletProvider(
          process.env.POAP_MAIN_PK,
          'https://mainnet.infura.io/v3/cf7a7eed37254ec4b95670607e76a917'
        );
      },
      gas: 5000000,
      gasPrice: 5e9, // 5 gwei (check https://ethgasstation.info/)
      network_id: 1,
    },
  },
};
