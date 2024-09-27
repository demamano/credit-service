import status from 'http-status-codes';

import { Request, Response } from 'express';
import prisma from '../../config/prismaClient.config';
import { decodeToken } from '../../utils/jwt';

import { toCSV } from '../../utils/csv';

export async function generateBranchData(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { providerId, companyId } = decodeToken(headers);

        const branchData = await prisma.providerBranch.findMany({
            where: {
                providerId: Number(providerId),
            },
            select: {
                id: true,
                branchName: true,
                branchDistrict: true,
                branchRegion: true,
                branchZone: true,
                branchKebele: true,
            },
        });

        let { path, csv } = toCSV(branchData);
        res.attachment(path);
        return res.status(200).send(csv);
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function me(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { providerId } = decodeToken(headers);

        const data = await prisma.providerBranch.findMany({
            where: {
                providerId,
            },
        });

        if (data) {
            return res.status(status.OK).json(data);
        }

        return res.status(status.NO_CONTENT).json({
            message: 'No Data!',
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function providerBranch(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.providerBranch.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                provider: true,
            },
        });

        if (data) {
            return res.status(status.OK).json(data);
        }

        return res.status(status.NO_CONTENT).json({
            message: 'No Data!',
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function providerBranchs(req: Request, res: Response) {
    try {
        const data = await prisma.providerBranch.findMany();
        return res.status(status.OK).json(data);
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function createProviderBranch(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { providerId, companyId } = decodeToken(headers);

        const body = req.body;

        const company = await prisma.company.findFirst({
            where: {
                id: Number(companyId),
            },
            select: {
                isProvider: true,
            },
        });

        if (company?.isProvider) {
            const data = await prisma.providerBranch.create({
                data: {
                    providerId,
                    ...body,
                },
            });

            return res.status(status.CREATED).json(data);
        } else {
            return res.status(status.NOT_FOUND).json({
                message:
                    'you are not a provider! you need to become a provider before adding branchs.',
            });
        }
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function updateProviderBranch(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const body = req.body;
        const data = await prisma.providerBranch.update({
            where: {
                id: Number(id),
            },
            data: body,
        });
        return res.status(status.CREATED).json(data);
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function removeProviderBranch(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.providerBranch.delete({
            where: {
                id: Number(id),
            },
        });
        return res.status(status.NO_CONTENT).json({
            status: true,
            message: 'Deleted  Succesfully!',
            data,
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}
