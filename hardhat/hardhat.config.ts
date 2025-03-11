import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-viem";
import "dotenv/config";
import "hardhat-storage-layout";

import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: ".env.local" });

if (!process.env.ALCHEMY_API_KEY) {
  throw new Error("ALCHEMY_API_KEY is not set");
}

const config: HardhatUserConfig = {
  solidity: {
    settings: {
      optimizer: {
        enabled: true,
        runs: 10_000,
      },
    },
    compilers: [
      {
        version: "0.8.24",
      },
      {
        version: "0.5.16",
      },
      {
        version: "0.6.6",
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 31337,
      accounts: {
        accountsBalance: "10000000000000000000000000000",
      },
    },
    "monad-testnet": {
      chainId: 10143,
      url: `https://monad-testnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    sepolia: {
      chainId: 11155111,
      url: "https://sepolia.drpc.org",
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },

  // sourcify: {
  //   enabled: true,
  //   apiUrl: "https://sourcify-api-monad.blockvision.org",
  //   browserUrl: "https://testnet.monadexplorer.com",
  // },
};

export default config;
