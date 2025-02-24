import { createConfig } from "ponder";
import { http } from "viem";

import { pumpFunAbi, pumpFunAddress } from "../generated";
import { monadTestnet } from "viem/chains";

const networks = {
  [monadTestnet.id]: {
    chainId: monadTestnet.id,
    transport: http(process.env.PONDER_RPC_URL_10143),
  },
} as const;

export default createConfig({
  networks,
  contracts: {
    pumpFun: {
      abi: pumpFunAbi,
      network: monadTestnet.id,
      address: pumpFunAddress[monadTestnet.id],
      startBlock: "latest",
    },
  },
});

export type SupportedChainIds = keyof typeof networks;
