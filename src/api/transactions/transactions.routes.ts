import { Hono } from "hono";
import {
  depositTransaction,
  withdrawalTransaction,
} from "./transactions.service.ts";
import { zValidator } from "@hono/zod-validator";
import {
  depositTransactionSchema,
  withdrawalTransactionSchema,
} from "./transactions.schemas.ts";

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
  );

export { transactionsRouter };
