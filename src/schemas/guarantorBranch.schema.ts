import { z } from 'zod';

export const createGuarantorBranchSchema = z.object({
    body: z.object({
        branchName: z.string(),
        branchRegion: z.string(),
        branchZone: z.string(),
        branchDistrict: z.string(),
        branchKebele: z.string(),
    }),
});

export const updateGuarantorBranchSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        branchName: z.string().optional(),
        branchRegion: z.string().optional(),
        branchZone: z.string().optional(),
        branchDistrict: z.string().optional(),
        branchKebele: z.string().optional(),
    }),
});

export const removeGuarantorBranchSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});
