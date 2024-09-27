import { z } from 'zod';

export const becomeCorporateSchema = z.object({
    body: z.object({
        companyId: z.string(),
    }),
});

export const removeCorporateSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});
