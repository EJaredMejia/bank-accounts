import { Hono } from "hono";
import { banksRouter } from "./api/bank-accounts/bank-accounts.routes.ts";

export function addRoutes<T extends Hono>(app: T) {
  return app.route("/", banksRouter);
}
