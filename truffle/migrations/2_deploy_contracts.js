var RaiToken = artifacts.require("RaiToken");
var MasterChef = artifacts.require("MasterChef");
var Migrator = artifacts.require("Migrator");
var RaiBar = artifacts.require("RaiBar");
var RaiMaker = artifacts.require("RaiMaker");
var RaiRestaurant = artifacts.require("RaiRestaurant");
var ZGovernorAlpha = artifacts.require("GovernorAlpha");
var Migrator2 = artifacts.require("Migrator");
var CMErc20 = artifacts.require("CMErc20");
var UniswapV2ERC20 = artifacts.require("UniswapV2ERC20")
var MockERC20 = artifacts.require("MockERC20")
var UniswapV2Factory = artifacts.require("UniswapV2Factory");

const deployAddress = "0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b";

module.exports = function (deployer) {
  deployer.deploy(UniswapV2Factory, deployAddress).then(function () {
    deployer.deploy(MockERC20, "DEB", "DEB", 100000)
    deployer.deploy(MockERC20, "PO", "PO", 100000)
    // deployer.deploy(UniswapV2ERC20).then(function () {
      // deployer.deploy(CMErc20, "RAI", "RAI", 1000000, 18);
      // deployer.deploy(Migrator).then(function (){
      //   deployer.deploy(Migrator2).then(function () {})
      // })
    // });
  });
  deployer.deploy(RaiToken).then(function () {
    // deployer.deploy(ZGovernorAlpha)
    // deployer.deploy(RaiMaker);
    // deployer.deploy(RaiBar);
    // deployer.deploy(Migrator);
    // deployer.deploy(RaiRestaurant);
    // deployer.deploy(MasterChef);
  });
};
