import { abi, bytecode } from "@uniswap/v2-core/build/UniswapV2Factory.json";
import { ContractFactory, ethers } from "ethers";

async function deployFactory(
  feeAddress: string,
  runner: ethers.ContractRunner
) {
  const Factory = new ContractFactory(abi, bytecode, runner);
  const factory = await Factory.deploy(feeAddress);
  await factory.waitForDeployment();
  return { factory, Factory };
}

export default deployFactory;
