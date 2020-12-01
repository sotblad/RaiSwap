const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");
const appRoot = require("app-root-path");

require.extensions[".txt"] = function (module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

const mnemonic = require(appRoot + "/mnemonic.txt");

module.exports = {
  // Uncommenting the defaults below
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          "https://ropsten.infura.io/v3/2c3aa42db34446419a62469974a87b66"
        );
      },
      network_id: 3,
      gas: 4000000
    },
    //  test: {
    //    host: "127.0.0.1",
    //    port: 7545,
    //    network_id: "*"
    //  }
  },
  //
  compilers: {
    solc: {
      version: "0.6.12",
    },
  },
};
