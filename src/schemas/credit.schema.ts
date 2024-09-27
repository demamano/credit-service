import { z } from 'zod';

export const addCreditSchema = z.object({
    body: z.object({
        amount: z.number(),
        paymentCondition: z.string(),
        note: z.string(),
        reference: z.string().optional(),
        branchId: z.number(),
        userId: z.number(),
    }),
});
