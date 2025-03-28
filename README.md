# REST API

This is a bank accounts api. API URL: https://bank-accounts.deno.dev

# Prerequisites

- Have deno installed if not see
  [how to install deno](https://docs.deno.com/runtime/getting_started/installation/)

- create a .env with the next values:

```
file:./bank-accounts.db
```

## Install

    deno install

## Run migrations

    deno task db:migrate

## Run seeders

    deno task db:seed

## Run the app

    deno task start

## Run the tests

    deno task test

## Run test coverage

    deno task test:coverage

## API DOCS

### Get bank account

#### Request

`GET /bank-accounts/:accountNumber`

```bash
curl --location 'https://bank-accounts.deno.dev/bank-accounts/1742164515550'
```

#### Response

```json
{
  "data": {
    "id": 4,
    "number_account": "1742164515550",
    "balance": 1000
  }
}
```

### Create bank account

#### Request

`POST /bank-accounts`

```bash
curl --location --request POST 'https://bank-accounts.deno.dev/bank-accounts'
```

#### Response

```json
{
  "data": {
    "id": 5,
    "number_account": "1742169583527",
    "balance": 1000
  }
}
```

### Deposit transaction

#### Request

`POST /transactions/deposit`

```bash
curl --location 'https://bank-accounts.deno.dev/transactions/deposit' \
--header 'Content-Type: application/json' \
--data '{
    "amount": 100,
    "accountNumber": "1742169583527"
}'
```

#### Response

```json
{
  "data": {
    "id": 5,
    "number_account": "1742169583527",
    "balance": 1100
  }
}
```

### Withdrawal transaction

#### Request

`POST /transactions/withdrawal`

```bash
curl --location 'https://bank-accounts.deno.dev/transactions/withdrawal' \
--header 'Content-Type: application/json' \
--data '{
    "amount": 100,
    "accountNumber": "1742169583527"
}'
```

#### Response

```json
{
  "data": {
    "id": 5,
    "number_account": "1742169583527",
    "balance": 1000
  }
}
```

### Get Transactions by account number

#### Request

`GET /transactions/:accountNumber`

```bash
curl --location 'https://bank-accounts.deno.dev/transactions/1742164515550'
```

#### Response

```json
{
  "data": {
    "bankAccount": {
      "id": 1,
      "number_account": "1742174738469",
      "balance": 800
    },
    "transactions": [
      {
        "id": 1,
        "amount": 100,
        "balance_after_transaction": 1100,
        "bank_account_id": 1,
        "transactionType": { "id": 2, "name": "deposit" }
      },
      {
        "id": 2,
        "amount": 100,
        "balance_after_transaction": 1000,
        "bank_account_id": 1,
        "transactionType": { "id": 1, "name": "withdrawal" }
      },
      {
        "id": 3,
        "amount": 200,
        "balance_after_transaction": 800,
        "bank_account_id": 1,
        "transactionType": { "id": 1, "name": "withdrawal" }
      }
    ]
  }
}
```
