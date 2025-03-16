import { testClient } from "hono/testing";
import { expect } from "jsr:@std/expect";
import { describe, it } from "jsr:@std/testing/bdd";
import { DEFAULT_BANK_ACCOUNT_BALANCE } from "./bank-accounts.constants.ts";
import { banksRouter } from "./bank-accounts.routes.ts";
import "../../../database/migrations/init.ts";

describe("bank accounts", () => {
  it("Should return the correct json", async () => {
    const app = banksRouter;
    const res = await testClient(app)["bank-accounts"].$get();

    expect(await res.json()).toEqual({
      data: "hello from bank accounts",
    });
  });
  it("Should return the new bank account", async () => {
    const app = banksRouter;
    const res = await testClient(app)["bank-accounts"].$post();
    const json = await res.json();
    expect(json.data.balance).toEqual(DEFAULT_BANK_ACCOUNT_BALANCE);

    expect(json.data.id).toBe(1);
    expect(typeof json.data.number_account).toBe("string");
  });
});
