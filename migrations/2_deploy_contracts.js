var RaiToken = artifacts.require("RaiToken");
var MasterChef = artifacts.require("MasterChef");
var Migrator = artifacts.require("Migrator");
var RaiBar = artifacts.require("RaiBar");
var RaiMaker = artifacts.require("RaiMaker");
var RaiRestaurant = artifacts.require("RaiRestaurant");

module.exports = function (deployer) {
  deployer.deploy(MasterChef);
  deployer.deploy(RaiToken);
  deployer.deploy(Migrator);
  deployer.deploy(RaiBar);
  deployer.deploy(RaiMaker);
  deployer.deploy(RaiRestaurant);
};
