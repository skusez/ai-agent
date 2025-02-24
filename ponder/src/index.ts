import { ponder } from "ponder:registry";
import schema from "ponder:schema";

ponder.on("pumpFun:CreatePool", async ({ event, context }) => {
  await context.db.insert(schema.eventCreatePool).values({
    userAddress: event.args.user,
    agentAddress: event.args.mint,
  });
});

ponder.on("pumpFun:Complete", async ({ event, context }) => {
  await context.db.insert(schema.eventComplete).values({
    userAddress: event.args.user,
    agentAddress: event.args.mint,
    timestamp: event.block.timestamp,
  });
});

ponder.on("pumpFun:Trade", async ({}) => {});
