import status from 'http-status-codes';
import { Request, Response } from 'express';
import prisma from '../../config/prismaClient.config';

export async function document(req: Request, res: Response) {
    try {
        const { id, cid } = req.params;

        const data = await prisma.documents.findFirst({
            where: {
                AND: [
                    {
                        id: Number(id),
                        companyId: Number(cid),
                    },
                ],
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

export async function documents(req: Request, res: Response) {
    try {
        const { cid } = req.params;

        const data = await prisma.documents.findMany({
            where: {
                companyId: Number(cid),
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

export async function approveSingleDocument(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.documents.update({
            where: {
                id: Number(id),
            },
            data: {
                isApproved: true,
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

export async function approveDocuments(req: Request, res: Response) {
    try {
        const { cid } = req.params;
        const data = await prisma.documents.findMany({
            where: {
                companyId: Number(cid),
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
