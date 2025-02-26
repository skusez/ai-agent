import { expect } from "chai";
// Hardhat's environment provides these functions from Mocha
import { ethers, storageLayout } from "hardhat";
import { describe, it } from "node:test";
import { UniswapV2Deployer } from "../deployers/UniswapV2Deployer";
describe("Test Pump Fun", function () {
  let hardhatTokenFactory: any;
  let hardhatPumpFun: any;
  let testToken: any;
  let addr1: any;
  let Erc20Token: any;
  const config = {
    name: "Test Token",
    symbol: "TST",
    decimals: 18,
    feeRecipient: "0x044421aAbF1c584CD594F9C10B0BbC98546CF8bc",
    feeAmount: 1000000000000000n,
    feeBasisPoint: 100n,
    initialVirtualTokenReserves: 1000000000000000000000000000n,
    initialVirtualEthReserves: 3000000000000000000000n,
    tokenTotalSupply: 1000000000000000000000000000n,
    mcapLimit: 100000000000000000000000n,
    initComplete: false,
    initUniswapV2Pair: "0x0000000000000000000000000000000000000000",
  };
  describe("Token Create", function () {
    it("Token Factory Deployment", async function () {
      const [owner] = await ethers.getSigners();

      console.log("Owner Balance :: ", await ethers.provider.getBalance(owner));

      const deployer = new UniswapV2Deployer();
      const { factory, router, weth9 } = await deployer.deploy(
        config.feeRecipient,
        owner
      );
      console.log("Owner Balance :: ", await ethers.provider.getBalance(owner));

      hardhatTokenFactory = await ethers.deployContract("TokenFactory");
      await hardhatTokenFactory.waitForDeployment();
      console.log(
        "Token Factory Address :: ",
        await hardhatTokenFactory.getAddress()
      );
      // Update constructor call with the fourth parameter (router)
      hardhatPumpFun = await ethers.deployContract("PumpFun", [
        config.feeRecipient,
        config.feeAmount,
        config.feeBasisPoint,
        await router.getAddress(),
        await hardhatTokenFactory.getAddress(),
      ]);
      await hardhatPumpFun.waitForDeployment();
      console.log("Pump Fun Address :: ", await hardhatPumpFun.getAddress());
    });

    it("Init Token Factory Variables", async function () {
      const pumpFunAddress = await hardhatPumpFun.getAddress();
      await hardhatTokenFactory.setPoolAddress(pumpFunAddress);

      expect(pumpFunAddress).to.equal(
        await hardhatTokenFactory.contractAddress()
      );
    });
    it("Token Creating on Token Factory Contract", async function () {
      await hardhatTokenFactory.deployERC20Token(config.name, config.symbol, {
        value: config.feeAmount,
      });
      testToken = await hardhatTokenFactory.tokens(0);
      const [owner] = await ethers.getSigners();
      const tokenBondingCurve = await hardhatPumpFun.getBondingCurve(
        testToken[0]
      );

      expect(tokenBondingCurve[0]).to.equal(testToken[0]); // tokenMint
      expect(tokenBondingCurve[1]).to.equal(config.initialVirtualTokenReserves); // virtualTokenReserves
      expect(tokenBondingCurve[2]).to.equal(config.initialVirtualEthReserves); // virtualEthReserves
      expect(tokenBondingCurve[3]).to.approximately(
        BigInt(10 ** 27),
        50000000000
      ); // realTokenReserves
      expect(tokenBondingCurve[4]).to.equal(0n); // realEthReserves
      expect(tokenBondingCurve[5]).to.equal(config.tokenTotalSupply); // tokenTotalSupply
      expect(tokenBondingCurve[6]).to.equal(config.mcapLimit); // mcapLimit
      expect(tokenBondingCurve[7]).to.equal(owner.address); // tokenOwner
      expect(tokenBondingCurve[8]).to.equal(config.initComplete); // complete
      expect(tokenBondingCurve[9]).to.equal(config.initUniswapV2Pair); // uniswapV2Pair
    });
  });

  describe("Buy/Sell Function Check", function () {
    it("Buy Function", async function () {
      [addr1] = await ethers.getSigners();

      Erc20Token = await ethers.getContractAt("IERC20", testToken[0]);
      const tokenBalance = await Erc20Token.balanceOf(addr1);
      const slippage = 20n;
      const amount = 1000000000000000000n;
      const tokenBondingCurve = await hardhatPumpFun.getBondingCurve(
        testToken[0]
      );

      const tokenReceivedWithLiquidity = exchangeRate(
        amount,
        tokenBondingCurve
      );
      const ethAmount = 1000000000000000000n;
      const maxEthAmount = (ethAmount * (100n + slippage)) / 100n;

      const before = await ethers.provider.getBalance(config.feeRecipient);

      const buyTx = await hardhatPumpFun
        .connect(addr1)
        .buy(testToken[0], tokenReceivedWithLiquidity, maxEthAmount, {
          value: ethAmount,
        });
      await buyTx.wait();

      console.log(
        "------------------Fee Wallet ETH Balance Change Show--------------------------"
      );

      const after = await ethers.provider.getBalance(config.feeRecipient);
      console.log(
        "Before Buy: ",
        before,
        "     After Buy: ",
        after,
        "\n >>>====== Change Balance ",
        after - before,
        "\n >>>====== Buy ETH Balance",
        10 ** 18,
        "\n>>>>>>========= Percentage: ",
        Number(((after - before) * 100n) / ethAmount)
      );
      console.log(
        "------------------------------------------------------------------------------\n"
      );

      const afterTokenBalance = await Erc20Token.balanceOf(addr1);
      console.log(
        "--------------------------Token Balance Change Show---------------------------"
      );

      console.log(
        "Before Token Balance: ",
        tokenBalance,
        "After Buy Token Balance: ",
        afterTokenBalance,
        "\n Change Balance: ",
        afterTokenBalance - tokenBalance,
        "\n Bought Amount:  "
      );
      console.log(
        "------------------------------------------------------------------------------\n"
      );
    });
    it("Sell Function", async function () {
      const tokenBalance = await Erc20Token.balanceOf(addr1);
      const slippage = 20n;
      const amount = tokenBalance;

      const tokenBondingCurve = await hardhatPumpFun.getBondingCurve(
        testToken[0]
      );
      const ethAmount = exchangeSellRate(amount, tokenBondingCurve);
      const minEthAmount = (ethAmount * (100n - slippage)) / 100n;

      const before = await ethers.provider.getBalance(config.feeRecipient);

      await Erc20Token.connect(addr1).approve(
        await hardhatPumpFun.getAddress(),
        amount
      );
      const sellTx = await hardhatPumpFun
        .connect(addr1)
        .sell(testToken[0], amount, minEthAmount);
      const receipt = await sellTx.wait();

      console.log(
        "------------------Fee Wallet ETH Balance Change Show--------------------------"
      );

      const after = await ethers.provider.getBalance(config.feeRecipient);
      console.log("<==== Sell Token Amount", amount, "\n");
      console.log(
        "------------------Fee Wallet ETH Balance Change Show--------------------------"
      );
      console.log(
        "Before Sell: ",
        before,
        "     After Sell: ",
        after,
        "\n >>>====== Change Balance  ",
        after - before,
        "\n >>>====== Sell ETH Balance",
        ethAmount,
        "\n>>>>>>========= Percentage: ",
        ((after - before) * 100n) / ethAmount
      );
      console.log(
        "------------------------------------------------------------------------------\n"
      );
    });
    it("Open Trading on Uniswap", async function () {
      // First, we need to make the token "complete" by buying enough tokens
      const tokenBondingCurve = await hardhatPumpFun.getBondingCurve(
        testToken[0]
      );

      console.log("Token Bonding Curve: ", tokenBondingCurve);

      // Calculate how much to buy to reach below 20% threshold
      // We need to buy enough tokens so that remaining tokens are less than 20% of total supply
      const targetTokensRemaining = (tokenBondingCurve[5] * 20n) / 100n - 1n; // 19% of total supply (below 20% threshold)
      const amountToBuy = tokenBondingCurve[3] - targetTokensRemaining;

      console.log("Amount To Buy: ", amountToBuy);

      // Calculate the actual ETH cost using the contract's function
      const ethCost = await hardhatPumpFun.calculateEthCost(
        {
          tokenMint: testToken[0],
          virtualTokenReserves: tokenBondingCurve[1],
          virtualEthReserves: tokenBondingCurve[2],
          realTokenReserves: tokenBondingCurve[3],
          realEthReserves: tokenBondingCurve[4],
          tokenTotalSupply: tokenBondingCurve[5],
          mcapLimit: tokenBondingCurve[6],
          tokenOwner: tokenBondingCurve[7],
          complete: tokenBondingCurve[8],
          uniswapV2Pair: tokenBondingCurve[9],
        },
        amountToBuy
      );

      // Add slippage to the calculated ETH cost
      const slippage = 20n; // 20%
      const maxEthAmount = (ethCost * (100n + slippage)) / 100n;

      // Buy tokens to make it complete
      await hardhatPumpFun
        .connect(addr1)
        .buy(testToken[0], amountToBuy, maxEthAmount, {
          value: maxEthAmount,
        });

      // Verify token is now complete
      const tokenBondingCurveAfterBuy = await hardhatPumpFun.getBondingCurve(
        testToken[0]
      );

      expect(tokenBondingCurveAfterBuy[8]).to.equal(true); // complete should be true

      // Now call openTradingOnUniswap
      await hardhatPumpFun.openTradingOnUniswap(testToken[0]);

      // Verify state changes
      const tokenBondingCurveAfterOpen = await hardhatPumpFun.getBondingCurve(
        testToken[0]
      );
      expect(tokenBondingCurveAfterOpen[9]).to.not.equal(
        "0x0000000000000000000000000000000000000000"
      ); // uniswapV2Pair should be set
      expect(tokenBondingCurveAfterOpen[3]).to.equal(0n); // realTokenReserves should be 0
      expect(tokenBondingCurveAfterOpen[4]).to.equal(0n); // realEthReserves should be 0

      console.log("Trading opened on Uniswap successfully!");
    });
  });
});

const exchangeRate = (purchaseAmount: BigInt, liquidityPool: any) => {
  let tokensSold = 0n;
  const totalLiquidity = liquidityPool[2] * liquidityPool[1];
  const newEthReserve = liquidityPool[2] + purchaseAmount;

  const pricePerToken = totalLiquidity / newEthReserve;

  tokensSold = BigInt(liquidityPool[1] - pricePerToken);
  // console.log(Number(tokensSold));
  tokensSold = tokensSold > liquidityPool[1] ? liquidityPool[1] : tokensSold;
  if (tokensSold < 0n) {
    tokensSold = 0n;
  }

  return tokensSold;
};

const exchangeSellRate = (amount: BigInt, liquidityPool: any) => {
  let ethSold = 0n;
  const totalLiquidity = liquidityPool[2] * liquidityPool[1];
  const newTokenReserve = liquidityPool[1] + amount;

  const pricePerToken = totalLiquidity / newTokenReserve;

  ethSold = BigInt(liquidityPool[2] - pricePerToken);

  ethSold = ethSold > liquidityPool[2] ? liquidityPool[2] : ethSold;
  if (ethSold < 0n) {
    ethSold = 0n;
  }

  return ethSold;
};
