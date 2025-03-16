import { Kysely } from "kysely";
import { Database } from "./models/database.models.ts";

import { Database as SqliteDatabase } from "jsr:@db/sqlite";
import { DenoSqlite3Dialect } from "jsr:@soapbox/kysely-deno-sqlite";

export { Database as Sqlite } from "jsr:@db/sqlite";

const dialect = new DenoSqlite3Dialect({
  database: new SqliteDatabase(Deno.env.get("DB_FILE_NAME") || ":memory:"),
});

export const db = new Kysely<Database>({
  dialect,
});
