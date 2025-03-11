"use client";
import { waitForTransactionReceipt } from "@wagmi/core";
import {
  readAgentFactoryInitialAmount,
  readAgentManagerGetCreateFee,
  useWriteAgentFactoryDeployErc20Token,
} from "../../generated";
/** @dev where ever your wagmi config is located */
import { config } from "web3-lib";
import { Hex, parseEther } from "viem";

async function getAgentCreateData() {
  //optionally get this data server side
  "use server";
  const initialAmountPromise = readAgentFactoryInitialAmount(config, {});
  const createFeePromise = readAgentManagerGetCreateFee(config, {});

  const [initialAmount, createFee] = await Promise.all([
    initialAmountPromise,
    createFeePromise,
  ]);

  return { initialAmount, createFee };
}

export const CreateAgentButton = ({
  onAgentCreated,
  agentName,
  agentSymbol,
  createFee,
}: {
  // do something after the agent is created eg mint 1% of supply
  onAgentCreated: (agentAddress: string) => void;
  agentName: string;
  agentSymbol: string;
  createFee: bigint;
}) => {
  const { writeContractAsync: createAgent, data: createAgentHash } =
    useWriteAgentFactoryDeployErc20Token();

  const handleCreateAgent = async () => {
    const hash = await createAgent({
      args: [agentName, agentSymbol], //what is the name and symbol of the agent
      value: createFee!, //how much ether is the user going to pay
    });

    const { logs } = await waitForTransactionReceipt(config, { hash });

    const agentAddress = logs[0].address; //this is the address of the agent

    if (!agentAddress) {
      throw new Error("Agent address is not loaded");
    }

    //  do something with the agent address
    onAgentCreated(agentAddress);
  };

  return (
    <div>
      <button onClick={handleCreateAgent}>Create Agent</button>
    </div>
  );
};

/**@dev example of minting 1% of the supply to the user */
const mintOnePercentOfSupply = async ({
  agentAddress,
}: {
  agentAddress: Hex;
}) => {
  /**
   * @dev mint 1% of the supply to the user
   */

  if (!isAgentSupplySuccess) {
    throw new Error("Agent supply is not loaded");
  }

  const onePercentOfSupply = agentSupply! / 100n;

  const hash = await buyAgentToken({
    // agent address, amount of tokens to buy, max amount of ether to pay
    args: [
      // agent token address
      agentAddress,
      // amount of tokens to buy
      onePercentOfSupply,
      // max amount of ether to pay NOTE: in production make this number more accurate
      parseEther("100"),
    ],
  });
};
