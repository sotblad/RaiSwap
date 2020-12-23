const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");
const appRoot = require("app-root-path");
const PrivateKeyProvider = require("./private-provider");

require.extensions[".txt"] = function (module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

const mnemonic = require(appRoot + "/mnemonic.txt");
const testPrivateKey = require(appRoot + "/test_private_key.txt");
const ropstenPrivateKey = require(appRoot + "/ropsten_private_key.txt");
const privateKeyDev =
  "99B3C12287537E38C90A9219D4CB074A89A16E9CDB20BF85728EBD97C343E342";

module.exports = {
  // Uncommenting the defaults below
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {
    development: {
      //   host: "127.0.0.1",
      //   port: 8545,
      // network_id: "*",
      provider: function () {
        // return new HDWalletProvider({
        //   privateKeys: testPrivateKey.split(","),
        //   providerOrUrl: "http://localhost:8545",
        // });
        return new PrivateKeyProvider(
          privateKeyDev,
          "http://localhost:9933/",
          1281
        );
      },
      network_id: 1281,
      skipDryRun: true,
    },
    ropsten: {
      provider: function () {
        // const mnemonic_t = mnemonic.replace(/\r/g, "").replace(/\n/g, "");
        return new HDWalletProvider({
          // mnemonic: mnemonic_t,
          privateKeys: [
            ropstenPrivateKey.replace(/\r/g, "").replace(/\n/g, ""),
          ],
          providerOrUrl:
            "https://ropsten.infura.io/v3/2c3aa42db34446419a62469974a87b66",
        });
      },
      network_id: 3,
      gas: 8000000,
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
      settings: {
        optimizer: {
          enabled: true
        }
      }
    },
  },
  plugins: ["moonbeam-truffle-plugin"],
};
