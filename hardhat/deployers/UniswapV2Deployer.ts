import { ethers } from "ethers";
import deployFactory from "./deployFactory";
import deployRouter from "./deployRouter";
import deployWETH9 from "./deployWETH9";
import Interface from "./Interface";

export class UniswapV2Deployer {
  public Interface = Interface;
  public async deploy(feeAddress: string, runner: ethers.ContractRunner) {
    const { factory, Factory } = await deployFactory(feeAddress, runner);
    const { weth9, WETH9 } = await deployWETH9(runner);
    const { router, Router } = await deployRouter(
      await factory.getAddress(),
      await weth9.getAddress(),
      runner
    );
    return {
      weth9,
      WETH9,
      factory,
      Factory,
      router,
      Router,
    };
  }
}
