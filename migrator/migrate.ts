import { join } from "node:path";
import { createClient } from "npm:@libsql/client/node";

async function runSql() {
  const migrationsPath = join(import.meta.dirname!, "..", "migrations");
  const fileArrays = Deno.readDirSync(migrationsPath).toArray();

  const lastItem = fileArrays.findLast((file) => file.isFile);

  if (!lastItem) return;

  const sql = await Deno.readTextFile(join(migrationsPath, lastItem.name));

  const db = createClient({ url: Deno.env.get("DB_FILE_NAME")! });
  await db.executeMultiple(sql);

  console.log("migration runned:", lastItem.name);
}

runSql();
