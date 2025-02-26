import {
  abi,
  bytecode,
} from "@uniswap/v2-periphery/build/UniswapV2Router02.json";
import { Contract, ContractFactory, ethers } from "ethers";

async function deployRouter(
  factoryAddress: string,
  weth9Address: string,
  runner: ethers.ContractRunner
) {
  const Router = new ContractFactory(abi, bytecode, runner);
  const router = await Router.deploy(factoryAddress, weth9Address);
  await router.waitForDeployment();
  return { router, Router };
}

export default deployRouter;
