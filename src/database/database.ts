import { Kysely } from "kysely";
import { Database } from "./models/database.models.ts";

const dbName = Deno.env.get("DB_FILE_NAME");

const { createClient } = dbName?.includes("file")
  ? await import("@libsql/client/node")
  : await import("@libsql/client/web");

import { LibsqlDialect } from "@libsql/kysely-libsql";

const client = createClient({
  url: Deno.env.get("DB_FILE_NAME") || ":memory:",
  authToken: Deno.env.get("DB_AUTH_TOKEN"),
});

const dialect = new LibsqlDialect({
  // @ts-expect-error works correctly
  client,
});

export const db = new Kysely<Database>({
  dialect,
});
