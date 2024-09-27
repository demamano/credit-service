import { z } from 'zod';

export const createServiceSchema = z.object({
    body: z.object({
        name: z.string(),
        serviceType: z.string().optional(),
    }),
});

export const updateServiceSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        name: z.string().optional(),
        serviceDescription: z.string().optional(),
    }),
});

export const removeServiceSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});
