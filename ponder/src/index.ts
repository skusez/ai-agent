/**
 * @dev handle events, we may want to do more logic in each event handler such as interacting with other database tables
 */
import { ponder } from "ponder:registry";
import schema from "ponder:schema";
import { getChainId } from "./utills";

ponder.on("pumpFun:CreatePool", async ({ event, context }) => {
  /**
   * @dev handle create pool event (update agent address in db? set user pools?)
   */
  await context.db.insert(schema.eventCreatePool).values({
    txHash: event.transaction.hash,
    userAddress: event.args.user,
    agentAddress: event.args.mint,
    timestamp: event.block.timestamp,
    chainId: getChainId(context.network()),
  });
});

ponder.on("pumpFun:Complete", async ({ event, context }) => {
  /**
   * @dev handle complete event (update agent status?)
   */
  await context.db.insert(schema.eventComplete).values({
    txHash: event.transaction.hash,
    userAddress: event.args.user,
    agentAddress: event.args.mint,
    timestamp: event.block.timestamp,
    chainId: getChainId(context.network()),
  });
});

ponder.on("pumpFun:Trade", async ({ event, context }) => {
  /**
   * @dev handle trade event (update pool stats?)
   */
  await context.db.insert(schema.eventTrade).values({
    ethAmount: event.args.ethAmount,
    tokenAmount: event.args.tokenAmount,
    isBuy: event.args.isBuy,
    virtualEthReserves: event.args.virtualEthReserves,
    virtualTokenReserves: event.args.virtualTokenReserves,
    txHash: event.transaction.hash,
    userAddress: event.args.user,
    agentAddress: event.args.mint,
    timestamp: event.block.timestamp,
    chainId: getChainId(context.network()),
  });
});
