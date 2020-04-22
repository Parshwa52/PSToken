const PSTokenSale = artifacts.require("./contracts/PSTokenSale.sol");
const PSToken = artifacts.require("./contracts/PSToken.sol");
contract('PSTokenSale',function(accounts)
{
    var tokenInstance;
    var tokenSaleInstance;
    var tokenPrice=1000000000000000;
    var admin=accounts[0];
    var buyer=accounts[1];
    var numberOfTokens;
    var tokensAvailable=750000;
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

    it('facilitates token buying',function(){
        return PSToken.deployed().then(function(instance){
            tokenInstance=instance;
            return PSTokenSale.deployed();
        }).then(function(instance){
            tokenSaleInstance=instance;
            return tokenInstance.transfer(tokenSaleInstance.address,tokensAvailable,{from:admin});
        }).then(function(receipt){
            numberOfTokens=10;
            return tokenSaleInstance.buyTokens(numberOfTokens,{from:buyer,value:numberOfTokens*tokenPrice});
        }).then(function(receipt){
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Sell', 'should be the "Sell" event');
            assert.equal(receipt.logs[0].args._buyer, buyer, 'logs the account that purchased the tokens');
            assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'logs the number of token purchased');
            return tokenSaleInstance.tokensSold();
        }).then(function(amount){
            assert.equal(amount.toNumber(),numberOfTokens,'increment number of token sold');
            return tokenInstance.balanceOf(buyer);
        }).then(function(balance){
            assert.equal(balance.toNumber(),numberOfTokens);
            return tokenInstance.balanceOf(tokenSaleInstance.address);
        }).then(function(balance){
            assert.equal(balance.toNumber(),tokensAvailable-numberOfTokens)
            return tokenSaleInstance.buyTokens(numberOfTokens,{from:buyer,value:1});
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert')>=0,'msg value must be equal to number of tokens in wei');
            return tokenSaleInstance.buyTokens(8000000,{from:buyer,value:numberOfTokens*tokenPrice});
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert')>=0,'cannot purchase more tokens than available');
        });

    });

    it('ends token sale', function() {
        return PSToken.deployed().then(function(instance) {
          // Grab token instance first
          tokenInstance = instance;
          return PSTokenSale.deployed();
        }).then(function(instance) {
          // Then grab token sale instance
          tokenSaleInstance = instance;
          // Try to end sale from account other than the admin
          return tokenSaleInstance.endSale({ from: buyer });
        }).then(assert.fail).catch(function(error) {
          assert(error.message.indexOf('revert' >= 0, 'must be admin to end sale'));
          // End sale as admin
          return tokenSaleInstance.endSale({ from: admin });
        }).then(function(receipt) {
          return tokenInstance.balanceOf(admin);
        }).then(function(balance) {
          assert.equal(balance.toNumber(), 999990, 'returns all unsold dapp tokens to admin');
          // Check that token price was reset when selfDestruct was called
          //console.log( tokenSaleInstance.tokenPrice());
          return tokenSaleInstance.tokensPrice();
        }).then(function(price) {
            console.log(price.toNumber());
          assert.equal(price.toNumber(), 0, 'token price was reset');
        });
      });
});

