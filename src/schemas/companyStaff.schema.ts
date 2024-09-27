import { z } from 'zod';

export const addCompanyStaffSchema = z.object({
    body: z.object({
        username: z.string(),
        email: z.string(),
        code: z.string().default('251'),
        phone: z.string(),
        password: z.string(),
        employeeId: z.string().optional(),
        branchId: z.number(),
        roleId: z.number(),
    }),
});

export const updateCompanyStaffSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        username: z.string(),
        code: z.string().default('251'),
        phone: z.string(),
        salt: z.string(),
    }),
});

export const removeCompanyStaffSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});
