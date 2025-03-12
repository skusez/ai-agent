// TODO fix
import hre from "hardhat";
import { parseEther, formatEther } from "ethers";
import { getAddress } from "viem";
// erc20 address = 0x85563691aADB8F9977861F075f2e579131649822
// agent address = 0xfbc2ed7c5c9aEf863E42fe1F862427A0b410C7D3
// token factory address = 0x9C6F2F3c726D5aBcc34D8227941A7602b4e9FC2B
async function main() {
  // Get deployed contracts
  const agentFactory = await hre.viem.getContractAt(
    "AgentFactory",
    "0xfbc2ed7c5c9aEf863E42fe1F862427A0b410C7D3"
  );
  const tokenFactory = await hre.viem.getContractAt(
    "TokenFactory",
    "0x9C6F2F3c726D5aBcc34D8227941A7602b4e9FC2B"
  );

  const createFee = await agentFactory.read.getCreateFee();
  console.log("Create fee:", formatEther(createFee));

  const bondingCurve = await agent.read.getBondingCurve({
    getAddress("0x85563691aadb8f9977861f075f2e579131649822")
});
  console.log("Bonding curve:", bondingCurve);
  const {
    virtualTokenReserves,
    virtualEthReserves,
    realTokenReserves,
    realEthReserves,
    tokenMint,
    tokenTotalSupply,
    mcapLimit,
    complete,
  } = bondingCurve;
  //   Make a trade using the agent contract
  const ethCost = await agent.calculateEthCost(
    {
      virtualTokenReserves,
      virtualEthReserves,
      realTokenReserves,
      realEthReserves,
      tokenMint,
      tokenTotalSupply,
      mcapLimit,
      complete,
    },
    parseEther("0.00001")
  );

  console.log("Eth cost:", formatEther(ethCost));

  const tradeTx = await agent.buy(
    "0x85563691aADB8F9977861F075f2e579131649822",
    ethCost,
    parseEther("0.00001"),
    {
      value: ethCost,
    }
  );
  await tradeTx.wait();
  console.log("Executed trade");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
