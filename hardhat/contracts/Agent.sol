// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Agent is ERC20Burnable {
    constructor(string memory agentName_, string memory agentSymbol_, uint256 initialSupply)
        ERC20(agentName_, agentSymbol_)
    {
        _mint(msg.sender, initialSupply);
    }
}
