import status from 'http-status-codes';

import { Request, Response } from 'express';
import prisma from '../../config/prismaClient.config';
import { decodeToken } from '../../utils/jwt';

export async function document(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { companyId } = decodeToken(headers);
        const { id } = req.params;

        const data = await prisma.documents.findFirst({
            where: {
                AND: [
                    {
                        id: Number(id),
                        companyId,
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
        const headers = req.header('Authorization');
        const { companyId } = decodeToken(headers);

        const data = await prisma.documents.findMany({
            where: {
                companyId: Number(companyId),
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

export async function addDocument(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { companyId } = decodeToken(headers);

        const body = req.body;

        console.log(body);
        console.log(companyId);
        const data = await prisma.documents.create({
            data: {
                companyId,
                ...body,
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

export async function updateDocument(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const body = req.body;

        const data = await prisma.documents.update({
            where: {
                id: Number(id),
            },
            data: {
                ...body,
            },
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

export async function removeDocument(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.documents.delete({
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
