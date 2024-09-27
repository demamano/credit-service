import status from 'http-status-codes';
import { Request, Response } from 'express';
import prisma from '../../config/prismaClient.config';

export async function guarantor(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.company.findFirst({
            where: {
                AND: [
                    {
                        id: Number(id),
                        isGuarantor: true,
                    },
                ],
            },
            include: {
                address: true,
                documents: true,
                staffs: true,
            },
        });

        return res.status(status.OK).json({
            data,
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function guarantors(req: Request, res: Response) {
    try {
        const { skip, take } = req.params;
        const data = await prisma.company.findMany({
            skip: Number(skip) || 0,
            take: Number(take) || 10,
            where: {
                isGuarantor: true,
            },
            include: {
                address: true,
                documents: true,
                staffs: true,
            },
        });

        return res.status(status.OK).json({
            data,
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}
