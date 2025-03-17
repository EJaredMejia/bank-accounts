import { Hono } from "hono";
import { depositTransaction } from "./transactions.service.ts";
import { zValidator } from "@hono/zod-validator";
import { depostiTransactionSchema } from "./transactions.schemas.ts";

const transactionsRouter = new Hono()
  .basePath("/transactions")
  .post("/deposit", zValidator("json", depostiTransactionSchema), async (c) => {
    const response = await depositTransaction(c.req.valid("json"));

    return c.json({
      data: response,
    });
  });

export { transactionsRouter };
