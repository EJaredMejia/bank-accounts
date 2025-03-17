import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  depositTransactionSchema,
  getTransactionByAccountSchema,
  withdrawalTransactionSchema,
} from "./transactions.schemas.ts";
import {
  depositTransaction,
  getTransactionByAccount,
  withdrawalTransaction,
} from "./transactions.service.ts";

const transactionsRouter = new Hono()
  .basePath("/transactions")
  .post("/deposit", zValidator("json", depositTransactionSchema), async (c) => {
    const response = await depositTransaction(c.req.valid("json"));

    return c.json({
      data: response,
    });
  })
  .post(
    "/withdrawal",
    zValidator("json", withdrawalTransactionSchema),
    async (c) => {
      const response = await withdrawalTransaction(c.req.valid("json"));

      return c.json({
        data: response,
      });
    }
  )
  .get(
    "/:accountNumber",
    zValidator("param", getTransactionByAccountSchema),
    async (c) => {
      const response = await getTransactionByAccount(
        c.req.valid("param").accountNumber
      );

      return c.json({
        data: response,
      });
    }
  );

export { transactionsRouter };
