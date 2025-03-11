import { defineConfig } from "@wagmi/cli";
import { actions, hardhat, react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "generated.ts",

  plugins: [
    hardhat({
      project: "./hardhat",
      deployments: {
        AgentManager: {
          10143: "0xa8cba74726686462039c015161237e7abe3be516",
        },
        AgentFactory: {
          10143: "0x539d38511439c407debe03e2cb0310b589039fba",
        },
      },
    }),
    actions(),
    react(),
  ],
});
