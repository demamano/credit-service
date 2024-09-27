import { z } from 'zod';

export const registerCompanySchema = z.object({
    body: z.object({
        type: z.string(),
        company: z.object({
            name: z.string(),
            companyType: z.string(),
            logo: z.string().optional(),
            tinNumber: z.string(),
        }),
        admin: z.object({
            username: z.string(),
            email: z.string(),
            code: z.string().default('251'),
            phone: z.string(),
            password: z.string(),
        }),
        provider: z
            .object({
                serviceId: z.number(),
                maximumCredit: z.number().optional(),
                serviceDescription: z.string().optional(),
            })
            .optional(),
        guarantor: z
            .object({
                maximumCredit: z.number().optional(),
            })
            .optional(),
        documents: z
            .array(
                z.object({
                    documentUrl: z.string().optional(),
                    documentType: z.string(),
                    documentReferenceNumber: z.string().optional(),
                    documentDescription: z.string().optional(),
                }),
            )
            .optional(),
    }),
});

export const updateCompanySchema = z.object({
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        name: z.string().optional(),
        companyType: z.string().optional(),
        tinNumber: z.string().optional(),
        code: z.string().default('251'),
        phone: z.string(),
    }),
});

export const setCompanyProfileSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        description: z.string().optional(),
    }),
});

export const removeCompanySchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});
