const PSToken = artifacts.require("./contracts/PSToken.sol");
const PSTokenSale=artifacts.require("./contracts/PSTokenSale.sol");
module.exports = function(deployer) {
  deployer.deploy(PSToken,1000000).then(function(){
    var tokenPrice=1000000000000000;
    return deployer.deploy(PSTokenSale,PSToken.address,tokenPrice);
  });
  
};
