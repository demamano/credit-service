import { z } from 'zod';

export const registerUserSchema = z.object({
    body: z.object({
        username: z.string(),
        email: z.string(),
        phone: z.string(),
        password: z.string(),
    }),
});

export const changeUserSchema = z.object({
    body: z.object({
        newPassword: z.string(),
        oldPassword: z.string(),
    }),
});

export const updateUserSchema = z.object({
    body: z.object({
        username: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
    }),
});
