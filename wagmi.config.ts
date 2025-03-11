import { defineConfig } from "@wagmi/cli";
import { actions, hardhat, react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "generated.ts",

  plugins: [
    hardhat({
      project: "./hardhat",
      // deployments: {
      //   AgentManager: {
      //     10143: "0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c",
      //   },
      //   AgentFactory: {
      //     10143: "0x0310D271B1CcCdbe4557B73a6Dcb3718cDAD8CFA",
      //   },
      // },
    }),
    actions(),
    react(),
  ],
});
