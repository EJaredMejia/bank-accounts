import { drizzle } from 'drizzle-orm/libsql';

import { createClient } from "npm:@libsql/client/node";

import * as schemas from "./models/database.schemas.ts";

const client = createClient({
  url: Deno.env.get("DB_FILE_NAME")!,
});

export const db = drizzle({ client, schema: { ...schemas } });
