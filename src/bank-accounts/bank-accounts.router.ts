import { Hono } from "hono";

const banksRouter = new Hono().basePath("/bank-accounts").get("/", (c) => {
  return c.json({
    data: "hello from bank accounts",
  });
});

export { banksRouter };
