import status from 'http-status-codes';
import { Request, Response } from 'express';
import prisma from '../../config/prismaClient.config';

export async function getCompanyNotification(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.notification.findMany({
            where: {
                companyId: Number(id),
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

export async function getNotification(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.notification.findFirst({
            where: {
                id: Number(id),
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

export async function createNotification(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const staffId = 1;
        const body = req.body;
        const data = await prisma.notification.create({
            data: {
                companyId: id,
                kstaffId: staffId,
                ...body,
            },
        });
        return res.status(status.CREATED).json({
            status: true,
            message: 'Notification Sent :)',
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}
