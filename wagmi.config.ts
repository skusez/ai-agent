import { defineConfig } from "@wagmi/cli";
import { actions, hardhat, react } from "@wagmi/cli/plugins";
import { sepolia } from "viem/chains";
export default defineConfig({
  out: "generated.ts",

  plugins: [
    hardhat({
      project: "./hardhat",
      deployments: {
        AgentManager: {
          [sepolia.id]: "0xa8cba74726686462039c015161237e7abe3be516",
        },
        AgentFactory: {
          [sepolia.id]: "0x539d38511439c407debe03e2cb0310b589039fba",
        },
      },
    }),
    actions(),
    react(),
  ],
});
