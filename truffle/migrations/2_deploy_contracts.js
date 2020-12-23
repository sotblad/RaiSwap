var RaiToken = artifacts.require("RaiToken");
var MasterChef = artifacts.require("MasterChef");
var Migrator = artifacts.require("Migrator");
var RaiBar = artifacts.require("RaiBar");
var RaiMaker = artifacts.require("RaiMaker");
var RaiRestaurant = artifacts.require("RaiRestaurant");
var ZGovernorAlpha = artifacts.require("GovernorAlpha");
var Migrator2 = artifacts.require("Migrator");
var UniswapV2ERC20 = artifacts.require("UniswapV2ERC20");
var MockERC20 = artifacts.require("MockERC20");
var UniswapV2Factory = artifacts.require("UniswapV2Factory");
var Timelock = artifacts.require("Timelock");
var UniswapV2Pair = artifacts.require("UniswapV2Pair");
var UniswapV2Router02 = artifacts.require("UniswapV2Router02");

const deployAddress = "0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b";

module.exports = function (deployer) {
  deployer.deploy(UniswapV2Factory, deployAddress).then(function () {});
  deployer.deploy(MockERC20, "DEB", "DEB", 100000);
  deployer.deploy(MockERC20, "PO", "PO", 100000);
  deployer.deploy(UniswapV2ERC20); //.then(function () {
  deployer.deploy(MockERC20, "RAI", "RAI", 1000000);
  deployer.deploy(UniswapV2Pair)
  deployer.deploy(RaiToken).then(function () {
    // deployer.deploy(RaiMaker);
    // deployer.deploy(RaiBar);
    // deployer.deploy(Migrator);
    // deployer.deploy(RaiRestaurant);
    // deployer.deploy(MasterChef);
  });
  deployer.deploy(ZGovernorAlpha, deployAddress, deployAddress, deployAddress);
  deployer.deploy(UniswapV2ERC20)
  deployer.deploy(UniswapV2Router02, deployAddress, deployAddress);
  // deployer.deploy(Timelock, deployAddress, 10);
};
