import { testClient } from "hono/testing";
import { expect } from "jsr:@std/expect";
import { describe, it } from "jsr:@std/testing/bdd";
import { banksRouter } from "./bank-accounts.router.ts";

describe("bank accounts", () => {
  const app = banksRouter;

  it("Should return the correct json", async () => {
    const res = await testClient(app)["bank-accounts"].$get();

    expect(await res.json()).toEqual({
      data: "hello from bank accounts",
    });
  });
});
