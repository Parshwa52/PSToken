const PSTokenSale = artifacts.require("./contracts/PSTokenSale.sol");

contract('PSTokenSale',function(accounts)
{
    var tokenSaleInstance;
    var tokenPrice=1000000000000000;
    it('initializes the contract with the correct values',function(){
        return PSTokenSale.deployed().then(function(instance){
            tokenSaleInstance=instance;
            return tokenSaleInstance.address
        }).then(function(address){
                assert.notEqual(address,'0x0','deploys contract on address');
                return tokenSaleInstance.tokenContract();
        }).then(function(address){
            assert.notEqual(address,'0x0','has token contract address');  
            return tokenSaleInstance.tokenPrice();       
        }).then(function(price){
            assert.equal(price,tokenPrice,'token price is correct');
        });
    });
})
