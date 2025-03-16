import { Kysely } from "kysely";
import { Database } from "./models/database.models.ts";

import { createClient } from "@libsql/client/node";
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
