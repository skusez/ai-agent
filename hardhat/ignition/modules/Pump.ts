import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "ethers";
const config = {
  localhost: {
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
  },
  "base-sepolia": {
    name: "PumpNotFun",
    symbol: "PNF",
    decimals: 18,
    feeRecipient: "0xfdf70cf0781cdb28bcef00167e15b09af343a29b",
    feeAmount: parseEther("0.0001"),
    feeBasisPoint: 100n,
    initialVirtualTokenReserves: parseEther("1000000"),
    initialVirtualEthReserves: parseEther("3000000"),
    tokenTotalSupply: parseEther("1000000000"),
    mcapLimit: parseEther("1000000000"),
    initComplete: false,
  },
  "monad-testnet": {
    name: "PumpNotFun",
    symbol: "PNF",
    decimals: 18,
    feeRecipient: "0xfdf70cf0781cdb28bcef00167e15b09af343a29b",
    feeAmount: parseEther("0.0001"),
    feeBasisPoint: 100n,
    initialVirtualTokenReserves: parseEther("1000000"),
    initialVirtualEthReserves: parseEther("3000000"),
    tokenTotalSupply: parseEther("1000000000"),
    mcapLimit: parseEther("1000000000"),
    initComplete: false,
  },
} as const;
function getConfig(network: string | undefined) {
  if (!network) {
    throw new Error("Network is required");
  }
  if (!(network in config)) {
    throw new Error(`Network ${network} not found`);
  }
  return config[network as keyof typeof config];
}
const PumpModule = buildModule("PumpFun", (m) => {
  const config = getConfig(process.env.HARDHAT_NETWORK);
  console.log("Config:", process.env.HARDHAT_NETWORK, config);

  // Deploy main contract first
  const pump = m.contract("PumpFun", [
    config.feeRecipient,
    config.feeAmount,
    config.feeBasisPoint,
  ]);

  const tokenFactory = m.contract("TokenFactory");

  return { pump, tokenFactory };
});

export default PumpModule;
