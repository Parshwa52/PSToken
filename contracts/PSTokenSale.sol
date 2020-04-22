pragma solidity >=0.4.21 <0.7.0;
import "./PSToken.sol";
contract PSTokenSale{
    address admin;
    PSToken public tokenContract;
    uint256 public tokenPrice;
    constructor(PSToken _tokenContract,uint256 _tokenPrice) public
    {
        admin=msg.sender;
        tokenContract=_tokenContract;
        tokenPrice=_tokenPrice;
    }
}