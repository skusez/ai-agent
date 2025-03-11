import { createConfig, NetworkConfig } from "ponder";
import { http } from "viem";

import { agentManagerAbi, agentManagerAddress } from "../generated";
import { monadTestnet, sepolia } from "viem/chains";
const networks = {
  [sepolia.id]: {
    chainId: sepolia.id,
    transport: http(process.env[`PONDER_RPC_URL_${sepolia.id}`]),
  },
  [monadTestnet.id]: {
    chainId: monadTestnet.id,
    transport: http(process.env[`PONDER_RPC_URL_${monadTestnet.id}`]),
  },
} as const satisfies Record<number, NetworkConfig>;

export default createConfig({
  networks,
  contracts: {
    agentManager: {
      abi: agentManagerAbi,
      network: {
        [sepolia.id]: {
          address: agentManagerAddress[sepolia.id],
          startBlock: 7878113,
        },
      },
    },
  },
});

export type SupportedChainIds = keyof typeof networks;
