import { createClient, desc } from "@ponder/client";
import { getPonderQueryOptions } from "@ponder/react";
import * as schema from "../../ponder/ponder.schema";

const client = createClient("http://localhost:42069/sql", { schema });

const createPoolQueryOptions = getPonderQueryOptions(client, (db) =>
  db
    .select()
    .from(schema.eventCreatePool)
    .orderBy(desc(schema.eventCreatePool.timestamp))
    .limit(10)
);

type CreatePool = Awaited<ReturnType<typeof createPoolQueryOptions.queryFn>>;

export { client, schema, createPoolQueryOptions, type CreatePool };
