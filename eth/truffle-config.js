const HDWalletProvider = require('truffle-hdwallet-provider');
// require('dotenv').config();


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
      // address: 0x79A560De1CD436d1D69896DDd8DcCb226f9Fa2fD
      provider: function() {
        // if (!process.env.POAP_ROPSTEN_PK) {
          if (3 == 5) {
          console.error('POAP_ROPSTEN_PK env variable is needed');
          process.abort();
        }
        return new HDWalletProvider(
          "9EE3E3088E2CE6D760093A4E1672A81DA41C01853AD1C4826A558EC0CCF455AD",
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
