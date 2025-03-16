import { z } from "zod";

export const getBalanceAccountSchema = z.object({
  accountNumber: z.string().min(16),
});
