import status from 'http-status-codes';

import { Request, Response } from 'express';
import prisma from '../../config/prismaClient.config';

export async function role(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.role.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                permissions: {
                    select: {
                        permission: true,
                    },
                },
            },
        });

        const permissions = data?.permissions.map((permission) => {
            return permission.permission.name;
        });

        if (data) {
            return res.status(status.OK).json({
                role: data.name,
                permissions,
            });
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

export async function roles(req: Request, res: Response) {
    try {
        const { skip, take } = req.query;
        const data = await prisma.role.findMany({
            skip: Number(skip) || 0,
            take: Number(take) || 10,
            include: {
                permissions: {
                    select: {
                        permission: true,
                    },
                },
            },
        });

        const rolePermissions = data.map((d) => {
            return {
                id: d.id,
                role: d.name,
                permissions: d.permissions.map((permission) => {
                    return permission.permission.name;
                }),
            };
        });
        return res.status(status.OK).json(rolePermissions);
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function createRole(req: Request, res: Response) {
    try {
        const body = req.body;
        const data = await prisma.role.create({
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

export async function updateRole(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const body = req.body;
        const data = await prisma.role.update({
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

export async function removeRole(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.role.delete({
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
