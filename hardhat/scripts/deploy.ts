import hre from "hardhat";
import { formatEther, getAddress, Hex, parseEther } from "viem";

import { baseSepolia, hardhat, monadTestnet, sepolia } from "viem/chains";
import { abi as agentFactoryAbi } from "../artifacts/contracts/AgentFactory.sol/AgentFactory.json";
import { waitForTransactionReceipt } from "viem/actions";

const deployConfig = {
  [hardhat.id]: {
    name: "Test Token",
    symbol: "TST",
    decimals: 18,
    feeRecipient: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    feeAmount: parseEther("0.1"),
    feeBasisPoint: 100n,
    initialVirtualTokenReserves: parseEther("1000000"),
    initialVirtualEthReserves: parseEther("3000000"),
    tokenTotalSupply: parseEther("1000000000"),
    mcapLimit: parseEther("1000000000"),
    initComplete: false,
    router: "0x7a250d5630b4cF539739dF2C5dAcb4c659F2488D",
  },
  [baseSepolia.id]: {
    name: "PumpNotFun",
    symbol: "PNF",
    decimals: 18,
    feeRecipient: "0xfdf70cf0781cdb28bcef00167e15b09af343a29b",
    feeAmount: parseEther("0.0000001"),
    feeBasisPoint: 100n,
    initialVirtualTokenReserves: parseEther("1000000"),
    initialVirtualEthReserves: parseEther("3000000"),
    tokenTotalSupply: parseEther("1000000000"),
    mcapLimit: parseEther("1000000000"),
    initComplete: false,
    router: "0x7a250d5630b4cF539739dF2C5dAcb4c659F2488D",
  },
  [monadTestnet.id]: {
    name: "PumpNotFun",
    symbol: "PNF",
    decimals: 18,
    feeRecipient: "0xfdf70cf0781cdb28bcef00167e15b09af343a29b",
    feeAmount: parseEther("0.0000001"),
    feeBasisPoint: 100n,
    initialVirtualTokenReserves: parseEther("1000000"),
    initialVirtualEthReserves: parseEther("3000000"),
    tokenTotalSupply: parseEther("1000000000"),
    mcapLimit: parseEther("1000000000"),
    initComplete: false,
    router: "0x7a250d5630b4cF539739dF2C5dAcb4c659F2488D",
  },
  [sepolia.id]: {
    name: "AGENTNAME",
    symbol: "AGENTSYMBOL",
    decimals: 18,
    feeRecipient: "0xfdf70cf0781cdb28bcef00167e15b09af343a29b",
    feeAmount: parseEther("0.0000001"),
    feeBasisPoint: 100n,
    initialVirtualTokenReserves: parseEther("1000000"),
    initialVirtualEthReserves: parseEther("3000000"),
    tokenTotalSupply: parseEther("1000000000"),
    mcapLimit: parseEther("1000000000"),
    initComplete: false,
    router: "0x7a250d5630b4cF539739dF2C5dAcb4c659F2488D",
  },
} as const;

async function main() {
  const publicClient = await hre.viem.getPublicClient();
  const [walletClient] = await hre.viem.getWalletClients();
  const deployer = walletClient.account.address;

  const balance = await publicClient.getBalance({ address: deployer });
  console.log("Balance of the account:", formatEther(balance));

  let hash: Hex = "0x";

  const agentFactoryContract = await hre.viem.deployContract("AgentFactory");

  console.log("deployed agent factory contract");

  const agentFactoryAddress = agentFactoryContract.address;
  if (!agentFactoryAddress) throw new Error("AgentFactory deployment failed");
  console.log("AgentFactory deployed to:", agentFactoryAddress);

  const config =
    deployConfig[publicClient.chain.id as keyof typeof deployConfig];

  if (!config)
    throw new Error(`Config for chain ${publicClient.chain.id} not found`);

  const args = [
    getAddress(config.feeRecipient),
    config.feeAmount,
    config.feeBasisPoint,
    getAddress(config.router),
    agentFactoryAddress,
  ];

  console.log("agent manager deploy args", args);

  const agentManagerContract = await hre.viem.deployContract(
    "AgentManager" as any,
    args
  );

  console.log("deployed agent manager contract");

  const agentManagerAddress = agentManagerContract.address;
  if (!agentManagerAddress) throw new Error("AgentManager deployment failed");
  console.log("AgentManager deployed to:", agentManagerAddress);

  // Set the agentManager address in TokenFactor

  hash = await walletClient.writeContract({
    abi: agentFactoryAbi,
    address: agentFactoryAddress,
    functionName: "setPoolAddress",
    args: [agentManagerAddress],
  });

  await waitForTransactionReceipt(walletClient, { hash });

  console.log("AgentFactory setPoolAddress");

  // Create a new token
  hash = await walletClient.writeContract({
    abi: agentFactoryAbi,
    address: agentFactoryAddress,
    functionName: "deployERC20Token",
    args: [config.name, config.symbol],
    value: config.feeAmount,
  });

  const tokenReceipt = await waitForTransactionReceipt(walletClient, { hash });
  const tokenAddress = tokenReceipt.logs[0].address;

  console.log("Token deployed at:", tokenAddress);

  console.log("\nNext steps:");
  console.log(
    "1. Users can buy tokens using: agent.buy(tokenAddress, amount, maxEthCost, {value: ethAmount})"
  );
  console.log(
    "2. Once the token is complete (mcap > mcapLimit or < 20% tokens left),"
  );
  console.log("   call: agent.openTradingOnUniswap(tokenAddress)");

  const balanceAfter = await publicClient.getBalance({ address: deployer });
  console.log("Balance of the account after:", formatEther(balanceAfter));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
