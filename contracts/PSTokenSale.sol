pragma solidity >=0.4.21 <0.7.0;
import "./PSToken.sol";
contract PSTokenSale{
    address  payable admin;
    PSToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event Sell(address _buyer,uint256 _amount);
    constructor(PSToken _tokenContract,uint256 _tokenPrice) public
    {
        admin=msg.sender;
        tokenContract=_tokenContract;
        tokenPrice=_tokenPrice;
    }
    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x, "ds-math-mul-overflow");
    }

    function buyTokens(uint256 _numberOfTokens) public payable{
       require(msg.value==multiply(_numberOfTokens,tokenPrice));
     //Require that value is equal to tokens
       require(tokenContract.balanceOf(address(this))>=_numberOfTokens); //Require that contract has enough tokens
        
        require(tokenContract.transfer(msg.sender,_numberOfTokens));
        //Require that a transfer is successful
        tokensSold+=_numberOfTokens;

        emit Sell(msg.sender,_numberOfTokens);
        //Keep track of token sold
        //Emit sell event
    }
    function endSale() public{
        require(msg.sender==admin);
        require(tokenContract.transfer(admin,tokenContract.balanceOf(address(this))));
        //Require admin
        //Transfer remaining dapp tokens to admin
        //Destroy contract
        selfdestruct(admin);
    }
}