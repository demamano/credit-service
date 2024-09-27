import { z } from 'zod';


export const createdGuarantorEmployeeSchema = z.object({
    body: z.object({
        employee: z.object({
            userId: z.number(),
            employeeId: z.string(),
            salary: z.number(),
            branchId: z.number(),
            hiringDate: z.string().optional(),
            creditLimit: z.number().optional()
        }),
        creditLimitGenerator: z.string().optional(),
    }),
});

export const updatedGuarantorEmployeeSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        salary: z.number().optional(),
        creditLimit: z.number().optional(),
        employeeId: z.string().optional(),
        hiringDate: z.string().optional(),
    }),
});

export const removeGuarantorEmployeeSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});
