const PSToken = artifacts.require("./contracts/PSToken.sol");

module.exports = function(deployer) {
  deployer.deploy(PSToken,1000000);
};
