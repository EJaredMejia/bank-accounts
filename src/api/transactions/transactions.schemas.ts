import { z } from "zod";

export const depostiTransactionSchema = z.object({
  amount: z.number().positive().min(1),
  accountNumber: z.string().min(1),
});
