import { z } from 'zod';

export const removeProviderSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});

export const becomeProviderSchema = z.object({
    body: z.object({
        serviceId: z.number(),
        serviceDescription: z.string().optional(),
    }),
});
