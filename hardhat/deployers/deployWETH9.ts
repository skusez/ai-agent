import { abi, bytecode } from "@uniswap/v2-periphery/build/WETH9.json";
import { ContractFactory, ethers } from "ethers";

async function deployWETH9(runner: ethers.ContractRunner) {
  const WETH9 = new ContractFactory(abi, bytecode, runner);
  const weth9 = await WETH9.deploy();
  await weth9.waitForDeployment();
  return { weth9, WETH9 };
}

export default deployWETH9;
