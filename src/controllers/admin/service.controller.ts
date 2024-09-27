import status from 'http-status-codes';

import { Request, Response } from 'express';
import prisma from '../../config/prismaClient.config';
import { cachedDataVersionTag } from 'node:v8';

export async function service(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.service.findFirst({
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

export async function services(req: Request, res: Response) {
    try {
        const { skip, take } = req.query;

        const data = await prisma.service.findMany({
            skip: Number(skip) || 0,
            take: Number(take) || 10,
            include: {
                _count: {
                    select: {
                        providers: true,
                    },
                },
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

export async function createService(req: Request, res: Response) {
    try {
        const body = req.body;
        const data = await prisma.service.create({
            data: body,
        });
        return res.status(status.CREATED).json({
            data,
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function updateService(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const body = req.body;
        const data = await prisma.service.update({
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

export async function removeService(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.service.delete({
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
