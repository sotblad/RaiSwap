var RaiToken = artifacts.require("RaiToken");
var MasterChef = artifacts.require("MasterChef");
var Migrator = artifacts.require("Migrator");
var RaiBar = artifacts.require("RaiBar");
var RaiMaker = artifacts.require("RaiMaker");
var RaiRestaurant = artifacts.require("RaiRestaurant");
var ZGovernorAlpha = artifacts.require("GovernorAlpha");
var UniswapV2Factory = artifacts.require("UniswapV2Factory");
var Migrator2 = artifacts.require("Migrator")

const deployAddress = "0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b"

module.exports = function (deployer) {
  deployer.deploy(UniswapV2Factory, deployAddress).then(function () {
    // deployer.deploy(Migrator).then(function (){
    //   deployer.deploy(Migrator2).then(function () {})
    // })
  })
  deployer.deploy(RaiToken).then(function () {
    // deployer.deploy(ZGovernorAlpha)
    // deployer.deploy(RaiMaker);
    // deployer.deploy(RaiBar);
    // deployer.deploy(Migrator);
    // deployer.deploy(RaiRestaurant);
    // deployer.deploy(MasterChef);
  });
};
