// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Token is ERC20Burnable {
    constructor(string memory tokenName_, string memory tokenSymbol_, uint256 initialSupply)
        ERC20(tokenName_, tokenSymbol_)
    {
        _mint(msg.sender, initialSupply);
    }
}
