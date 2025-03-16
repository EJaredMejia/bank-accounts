import { Hono } from "hono";
import { createBankAccount } from "./bank-accounts.service.ts";

const banksRouter = new Hono()
  .basePath("/bank-accounts")
  .get("/", (c) => {
    return c.json({
      data: "hello from bank accounts",
    });
  })
  .post("/", async (c) => {
    const response = await createBankAccount();

    return c.json({
      data: response,
    });
  });

export { banksRouter };
