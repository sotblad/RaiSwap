var RaiToken = artifacts.require("RaiToken");
var MasterChef = artifacts.require("MasterChef");
var Migrator = artifacts.require("Migrator");
var RaiBar = artifacts.require("RaiBar");
var RaiMaker = artifacts.require("RaiMaker");
var RaiRestaurant = artifacts.require("RaiRestaurant");
var ZGovernorAlpha = artifacts.require("GovernorAlpha");

module.exports = function (deployer) {
  deployer.deploy(RaiToken).then(function () {
    // deployer.deploy(ZGovernorAlpha)
    // deployer.deploy(RaiMaker);
    // deployer.deploy(RaiBar);
    // deployer.deploy(Migrator);
    // deployer.deploy(RaiRestaurant);
    // deployer.deploy(MasterChef);
  });
};
