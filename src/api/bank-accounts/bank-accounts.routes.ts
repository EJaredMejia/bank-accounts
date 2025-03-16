import { Hono } from "hono";
import { zValidator } from "npm:@hono/zod-validator";
import { getBalanceAccountSchema } from "./bank-accounts.schemas.ts";
import {
  createBankAccount,
  getBankAccountByNumber,
} from "./bank-accounts.service.ts";

const banksRouter = new Hono()

  .basePath("/bank-accounts")
  .get(
    "/:accountNumber",
    zValidator("param", getBalanceAccountSchema),
    async (c) => {
      const accountNumber = c.req.param("accountNumber");
      const response = await getBankAccountByNumber(accountNumber);
      return c.json({
        data: response,
      });
    }
  )
  .post("/", async (c) => {
    const response = await createBankAccount();

    return c.json({
      data: response,
    });
  });

export { banksRouter };
