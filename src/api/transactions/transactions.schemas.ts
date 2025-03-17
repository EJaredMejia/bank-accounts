import { z } from "zod";

export const depositTransactionSchema = z.object({
  amount: z.number().positive().min(1),
  accountNumber: z.string().min(1),
});

export const withdrawalTransactionSchema = depositTransactionSchema;
