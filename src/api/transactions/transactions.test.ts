import { testClient } from "hono/testing";
import { expect } from "jsr:@std/expect";
import { describe, it } from "jsr:@std/testing/bdd";
import { app } from "../../app.ts";

describe("transactions", () => {
  it("Should return transactions", async () => {
    const amountToAdd = 500;

    const responseBank = await testClient(app)["bank-accounts"].$post();
    const bankAccount = await responseBank.json();

    await testClient(app)["transactions"].deposit.$post({
      json: {
        amount: amountToAdd,
        accountNumber: bankAccount.data.number_account,
      },
    });

    const transactionResponse = await testClient(app)["transactions"][
      ":accountNumber"
    ].$get({
      param: {
        accountNumber: bankAccount.data.number_account,
      },
    });
    const { data } = await transactionResponse.json();

    expect(data.bankAccount.number_account).toBe(
      bankAccount.data.number_account,
    );

    expect(data.transactions[0].amount).toBe(amountToAdd);
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
      bankAccount.data.number_account,
    );

    expect(updatedBankAccount.data?.balance).toBe(
      bankAccount.data.balance + amount,
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
      bankAccount.data.number_account,
    );

    expect(updatedBankAccount.data?.balance).toBe(
      bankAccount.data.balance - amount,
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
