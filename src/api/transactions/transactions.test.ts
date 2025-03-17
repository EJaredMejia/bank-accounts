import { testClient } from "hono/testing";
import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { app } from "../../app.ts";
import { expect } from "jsr:@std/expect";

describe("transactions", () => {
  beforeAll(async () => {
    await import("./../../../database/migrations/init.ts");

    await import("./../../../database/seeders/run.ts");
  });
  it("Should return the bank account with updated balance", async () => {
    const amount = 150;

    const responseBank = await testClient(app)["bank-accounts"].$post();
    const bankAccount = await responseBank.json();
    const res = await testClient(app)["transactions"].deposit.$post({
      json: {
        amount,
        accountNumber: bankAccount.data.number_account,
      },
    });

    const updatedBankAccount = await res.json();
    expect(updatedBankAccount.data?.number_account).toBe(
      bankAccount.data.number_account
    );

    expect(updatedBankAccount.data?.balance).toBe(
      bankAccount.data.balance + amount
    );
  });
});
