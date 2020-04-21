const PSToken = artifacts.require("./contracts/PSToken.sol");

contract('PSToken',function(accounts){

    it('sets the total supply upon deployment',function(){
        return PSToken.deployed().then(function(instance){
            tokenInstance=instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(),1000000,'sets the total supply to 1000000');
        });
    });
})