import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: ".env.local" });

if (!process.env.ALCHEMY_API_KEY) {
  throw new Error("ALCHEMY_API_KEY is not set");
}

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    "monad-testnet": {
      url: `https://monad-testnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
};

export default config;
