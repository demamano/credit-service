import { z } from 'zod';

export const addPaymentSchema = z.object({
    body: z.object({
        paymentMethod: z.string(),
        transactionReference: z.string().optional(),
        amount: z.number(),
        currency: z.string().default('Etb'),
        status: z.string(),
        note: z.string().optional(),
        userId: z.number(),
        creditId: z.number(),
    }),
});
