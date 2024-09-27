import { z } from 'zod';

export const kuserSchema = z.object({
    body: z.object({
        username: z.string(),
        email: z.string(),
        phone: z.string(),
        password: z.string(),
        salary: z.number(),
        employeeId: z.string().optional(),
    }),
});

export const kuserAuthSchema = z.object({
    body: z.object({
        username: z.string(),
        password: z.string(),
    }),
});

export const kuserResetPasswordSchema = z.object({
    body: z.object({
        currentPassword: z.string(),
        newPassowrd: z.string(),
    }),
});
