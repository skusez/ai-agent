import hre from "hardhat";
import PumpModule from "../ignition/modules/Pump";

async function main() {
  // get the deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  // log the balance of the account
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Balance of the account:", balance);

  const { pump, tokenFactory } = await hre.ignition.deploy(PumpModule);
  const pumpAddress = await pump.getAddress();
  console.log("Pump deployed to:", pumpAddress);

  const tokenFactoryAddress = await tokenFactory.getAddress();
  console.log("TokenFactory deployed to:", tokenFactoryAddress);

  // Set the PumpFun address in TokenFactory
  await tokenFactory.setPoolAddress(pumpAddress);
  console.log("TokenFactory setPoolAddress to:", pumpAddress);

  // Create a new token
  await tokenFactory.deployERC20Token("Test Token", "TST", {
    value: 1000000000000000n,
  });
  console.log("New token deployed");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
