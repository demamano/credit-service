import status from 'http-status-codes';

import { Request, Response } from 'express';
import prisma from '../../config/prismaClient.config';
import { decodeToken } from '../../utils/jwt';

export async function me(req: Request, res: Response) {
    try {
        let data;
        const headers = req.header('Authorization');
        const { companyId } = decodeToken(headers);

        companyId.forEach(async (id: number) => {
            let temp = await prisma.provider.findMany({
                where: {
                    companyId: id,
                },
            });
            data.push(temp);
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

export async function provider(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.provider.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                branchs: true,
                company: {
                    select: {
                        name: true,
                    },
                },
                services: true,
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

export async function providers(req: Request, res: Response) {
    try {
        const data = await prisma.provider.findMany({
            include: {
                company: {
                    select: {
                        name: true,
                    },
                },
                services: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return res.status(status.OK).json(data);
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function becomeProvider(req: Request, res: Response) {
    try {
        const body = req.body;
        const headers = req.header('Authorization');
        const { companyId } = decodeToken(headers);

        const [provider, company] = await prisma.$transaction([
            prisma.provider.upsert({
                where: {
                    companyId,
                },
                create: {
                    companyId,
                    ...body,
                },
                update: {
                    ...body,
                },
            }),
            prisma.company.update({
                where: {
                    id: Number(companyId),
                },
                data: {
                    isProvider: true,
                },
            }),
        ]);

        return res.status(status.CREATED).json({
            provider,
            company,
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function removeProvider(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.provider.delete({
            where: {
                id: Number(id),
            },
        });
        return res.status(status.NO_CONTENT).json({
            status: true,
            message: 'Deleted  Succesfully!',
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}
