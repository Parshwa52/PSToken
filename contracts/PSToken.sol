pragma solidity >=0.4.21 <0.7.0;

contract PSToken
{
    uint256 public totalSupply;

    constructor() public{
        totalSupply=1000000;
    }
}