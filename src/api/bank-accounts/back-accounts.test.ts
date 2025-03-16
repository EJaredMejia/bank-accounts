import { testClient } from "hono/testing";
import { expect } from "jsr:@std/expect";
import { describe, it } from "jsr:@std/testing/bdd";
import { DEFAULT_BANK_ACCOUNT_BALANCE } from "./bank-accounts.constants.ts";
import { banksRouter } from "./bank-accounts.routes.ts";
import "../../../database/migrations/init.ts";

describe("bank accounts", () => {
  const app = banksRouter;
  it("Should return the bank account", async () => {
    const res = await testClient(app)["bank-accounts"].$post();
    const newBankAccount = await res.json();

    const getResponse = await testClient(app)["bank-accounts"][
      ":accountNumber"
    ].$get({
      param: {
        accountNumber: newBankAccount.data.number_account,
      },
    });

    expect(newBankAccount).toEqual(await getResponse.json());
  });
  it("should return 404 on not found number account", async () => {
    const getResponse = await testClient(app)["bank-accounts"][
      ":accountNumber"
    ].$get({
      param: {
        accountNumber: "123",
      },
    });

    expect(await getResponse.text()).toBe("Bank account not found");
  });
  it("Should return the new bank account", async () => {
    const res = await testClient(app)["bank-accounts"].$post();
    const json = await res.json();
    expect(json.data.balance).toEqual(DEFAULT_BANK_ACCOUNT_BALANCE);

    expect(typeof json.data.id).toBe("number");
    expect(typeof json.data.number_account).toBe("string");
  });
});
