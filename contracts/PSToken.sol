pragma solidity >=0.4.21 <0.7.0;

contract PSToken
{
    event Transfer(address indexed _from,address indexed _to,uint256 _value);
    uint256 public totalSupply;
    string public name = "PSToken";
    string public symbol="PS";
    string public standard="PS Token v1.0";
    mapping(address=>uint256) public balanceOf;
    constructor(uint256 _initialSupply) public
    {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    function transfer(address _to,uint256 _value) public returns(bool)
    {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender,_to,_value);
        return true;
    }
}