import { testClient } from "hono/testing";
import { beforeAll, beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { app } from "../../app.ts";
import { expect } from "jsr:@std/expect";

describe("transactions", () => {
  beforeEach(async () => {
    await (await import("./../../../database/migrations/init.ts")).up();

    await (await import("./../../../database/seeders/run.ts")).runSeeders();
  });

  it("Should return the bank account with updated balance after deposit", async () => {
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

  it("Should return the bank account with updated balance after withdrawal", async () => {
    const amount = 150;

    const responseBank = await testClient(app)["bank-accounts"].$post();
    const bankAccount = await responseBank.json();
    const res = await testClient(app)["transactions"].withdrawal.$post({
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
      bankAccount.data.balance - amount
    );
  });

  it("Should throw expection if balance is not enough for widthdrawal", async () => {
    const responseBank = await testClient(app)["bank-accounts"].$post();
    const bankAccount = await responseBank.json();
    const res = await testClient(app)["transactions"].withdrawal.$post({
      json: {
        amount: bankAccount.data.balance + 1000,
        accountNumber: bankAccount.data.number_account,
      },
    });

    const updatedBankAccount = await res.text();
    expect(updatedBankAccount).toBe("Not enough balance");
  });
});
