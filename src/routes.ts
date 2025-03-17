import { Hono } from "hono";
import { banksRouter } from "./api/bank-accounts/bank-accounts.routes.ts";
import { transactionsRouter } from "./api/transactions/transactions.routes.ts";

export function addRoutes<T extends Hono>(app: T) {
  return app.route("/", banksRouter).route("/", transactionsRouter);
}
