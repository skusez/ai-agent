// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "./Agent.sol";

interface IAgentManager {
    function createPool(address token, uint256 amount, address tokenOwner) external payable;
    function getCreateFee() external view returns (uint256);
}

contract AgentFactory {
    uint256 public currentAgentIndex = 0;
    uint256 public immutable INITIAL_AMOUNT = 10 ** 27;

    address public contractAddress;
    address public owner;

    struct AgentStructure {
        address agentAddress;
        string agentName;
        string agentSymbol;
        uint256 totalSupply;
    }

    AgentStructure[] public agents;

    constructor() {
        owner = msg.sender;
    }

    function deployERC20Token(string memory name, string memory ticker) public payable returns (address) {
        Agent agent = new Agent(name, ticker, INITIAL_AMOUNT);
        agents.push(AgentStructure(address(agent), name, ticker, INITIAL_AMOUNT));

        agent.approve(contractAddress, INITIAL_AMOUNT);
        uint256 fee = IAgentManager(contractAddress).getCreateFee();

        require(msg.value >= fee, "Input Balance Should Be larger");

        IAgentManager(contractAddress).createPool{value: fee}(address(agent), INITIAL_AMOUNT, msg.sender);
        if (msg.value > fee) {
            payable(msg.sender).transfer(msg.value - fee);
        }

        return address(agent);
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
