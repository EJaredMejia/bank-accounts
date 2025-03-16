import { testClient } from "hono/testing";
import { expect } from "jsr:@std/expect";
import { describe, it } from "jsr:@std/testing/bdd";
import { banksRouter } from "./bank-accounts.routes.ts";

describe("bank accounts", () => {
  it("Should return the correct json", async () => {
    const app = banksRouter;
    const res = await testClient(app)["bank-accounts"].$get();

    expect(await res.json()).toEqual({
      data: "hello from bank accounts",
    });
  });
});
