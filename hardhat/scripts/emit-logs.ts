import hre from "hardhat";
import { parseEther, formatEther } from "ethers";
// erc20 address = 0x85563691aADB8F9977861F075f2e579131649822
// pump address = 0xfbc2ed7c5c9aEf863E42fe1F862427A0b410C7D3
// token factory address = 0x9C6F2F3c726D5aBcc34D8227941A7602b4e9FC2B
async function main() {
  // Get deployed contracts
  const pump = await hre.ethers.getContractAt(
    "PumpFun",
    "0xfbc2ed7c5c9aEf863E42fe1F862427A0b410C7D3"
  );
  const tokenFactory = await hre.ethers.getContractAt(
    "TokenFactory",
    "0x9C6F2F3c726D5aBcc34D8227941A7602b4e9FC2B"
  );

  const createFee = await pump.getCreateFee();
  console.log("Create fee:", formatEther(createFee));

  const bondingCurve = await pump.getBondingCurve(
    "0x85563691aadb8f9977861f075f2e579131649822"
  );
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
  //   Make a trade using the pump contract
  const ethCost = await pump.calculateEthCost(
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

  const tradeTx = await pump.buy(
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

// //
// {
//         block {
//           hash
//           logs(filter: {
//             addresses: ["0xfbc2ed7c5c9aEf863E42fe1F862427A0b410C7D3"],
//             topics: [
//             "0xdbd2a1ea6808362e6adbec4db4969cbc11e3b0b28fb6c74cb342defaaf1daada",
//             "0x50e82f857ece413f502ecf1e6db36e3f6f1c118bb444db8409896b1bf1d11e3d",
//             "0x671f6af1a2244f88c1a5e6c6310f86653d313027950723ffc12387348a9ed8b3"
//             ]
//           }) {
//             data
//             topics
//             transaction {
//               hash
//             }
//           }
//         }
//       }
