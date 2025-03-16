import { Hono } from "hono";
import { banksRouter } from "./bank-accounts/bank-accounts.router.ts";

export function addRoutes<T extends Hono>(app: T) {
  return app.route("/", banksRouter);
}
