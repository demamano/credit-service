import { z } from 'zod';

export const createRoleSchema = z.object({
    body: z.object({
        name: z.string(),
    }),
});

export const updateRoleSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        name: z.string().optional(),
    }),
});

export const removeRoleSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});

export const nRoleSchema = z.object({
    body: z.object({
        roleId: z.number(),
        staffId: z.number(),
    }),
});

export const rolePermissionSchema = z.object({
    body: z.object({
        roleId: z.number(),
        permissions: z.array(z.number()),
    }),
});
