import status from 'http-status-codes';
import { Request, Response } from 'express';
import prisma from '../../config/prismaClient.config';

export async function inapprovedProviders(req: Request, res: Response) {
    try {
        const { skip, take } = req.params;
        const data = await prisma.provider.findMany({
            skip: Number(skip) || 0,
            take: Number(take) || 10,
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

export async function approvedProviders(req: Request, res: Response) {
    try {
        const { skip, take } = req.query;
        const data = await prisma.provider.findMany({
            skip: Number(skip) || 0,
            take: Number(take) || 10,
            where: {
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

export async function activeProviders(req: Request, res: Response) {
    try {
        const { skip, take } = req.query;
        const data = await prisma.provider.findMany({
            skip: Number(skip) || 0,
            take: Number(take) || 10,
            where: {
                isActive: true,
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

export async function inactiveProviders(req: Request, res: Response) {
    try {
        const { skip, take } = req.query;
        const data = await prisma.provider.findMany({
            skip: Number(skip) || 0,
            take: Number(take) || 10,
            where: {
                isActive: false,
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

export async function approveProvider(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.provider.update({
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

export async function inapproveProvider(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.provider.update({
            where: {
                id: Number(id),
            },
            data: {
                isApproved: false,
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

export async function inactiveProvider(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.provider.update({
            where: {
                id: Number(id),
            },
            data: {
                isActive: false,
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

export async function activeProvider(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.provider.update({
            where: {
                id: Number(id),
            },
            data: {
                isActive: true,
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
