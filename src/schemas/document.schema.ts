import { z } from 'zod';

export const addDocumentSchema = z.object({
    body: z.object({
        become: z.string(),
        documentUrl: z.string().optional(),
        documentType: z.string(),
        documentReferenceNumber: z.string().optional(),
        documentDescription: z.string().optional(),
    }),
});

export const updateDocumentSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        become: z.string(),
        documentUrl: z.string().optional(),
        documentType: z.string().optional(),
        documentReferenceNumber: z.string().optional(),
        documentDescription: z.string().optional(),
    }),
});

export const removeDocumentSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});
