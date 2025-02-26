// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "./Token.sol";

interface IPumpFun {
    function createPool(address token, uint256 amount, address tokenOwner) external payable;
    function getCreateFee() external view returns (uint256);
}

contract TokenFactory {
    uint256 public currentTokenIndex = 0;
    uint256 public immutable INITIAL_AMOUNT = 10 ** 27;

    address public contractAddress;
    address public owner;

    struct TokenStructure {
        address tokenAddress;
        string tokenName;
        string tokenSymbol;
        uint256 totalSupply;
    }

    TokenStructure[] public tokens;

    constructor() {
        owner = msg.sender;
    }

    function deployERC20Token(string memory name, string memory ticker) public payable returns (address) {
        Token token = new Token(name, ticker, INITIAL_AMOUNT);
        tokens.push(TokenStructure(address(token), name, ticker, INITIAL_AMOUNT));

        token.approve(contractAddress, INITIAL_AMOUNT);
        uint256 fee = IPumpFun(contractAddress).getCreateFee();

        require(msg.value >= fee, "Input Balance Should Be larger");

        IPumpFun(contractAddress).createPool{value: fee}(address(token), INITIAL_AMOUNT, msg.sender);
        if (msg.value > fee) {
            payable(msg.sender).transfer(msg.value - fee);
        }

        return address(token);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not Owner");
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Non zero Address");
        owner = newOwner;
    }

    function setPoolAddress(address newAddr) public onlyOwner {
        require(newAddr != address(0), "Non zero Address");
        contractAddress = newAddr;
    }
}
