import { z } from 'zod';

export const createPermissionSchema = z.object({
    body: z.object({
        name: z.string(),
    }),
});

export const updatePermissionSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        name: z.string().optional(),
    }),
});

export const removePermissionSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});
