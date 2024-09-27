import status from 'http-status-codes';

import { Request, Response } from 'express';
import prisma from '../../config/prismaClient.config';
import { decodeToken } from '../../utils/jwt';

export async function guarantor(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.company.findFirst({
            where: {
                id: Number(id),
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

export async function guarantors(req: Request, res: Response) {
    try {
        const { skip, take } = req.query;
        const data = await prisma.company.findMany({
            skip: Number(skip) || 0,
            take: Number(take) || 10,
            where: {
                isGuarantor: true,
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

export async function becomeGuarantor(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { companyId } = decodeToken(headers);

        const data = await prisma.company.update({
            where: {
                id: companyId,
            },
            data: {
                isGuarantor: true,
            },
        });
        return res.status(status.CREATED).json(data);
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function removeGuarantor(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.company.update({
            where: {
                id: Number(id),
            },
            data: {
                isGuarantor: false,
            },
        });
        return res.status(status.NO_CONTENT).json({
            status: true,
            message: 'Remove from Gurantor!',
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}
