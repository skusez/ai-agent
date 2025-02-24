import { defineConfig } from "@wagmi/cli";
import { hardhat } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "generated.ts",

  plugins: [
    hardhat({
      project: "./hardhat",
      deployments: {
        PumpFun: {
          10143: "0xea31e60F06a30AA3fc5cA4203BC0DCd7C3f5f06c",
        },
      },
    }),
  ],
});
