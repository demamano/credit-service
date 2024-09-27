import status from 'http-status-codes';
import { Request, Response } from 'express';

import { encrypt } from '../../utils/hash';
import prisma from '../../config/prismaClient.config';
import { decodeToken } from '../../utils/jwt';

export async function me(req: any, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { userId } = decodeToken(headers);

        const data = await prisma.user.findFirst({
            where: {
                id: Number(userId),
            },
            include: {
                profile: true,
                workingBranch: true,
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

export async function user(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.user.findFirst({
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

export async function users(req: Request, res: Response) {
    try {
        const { skip, take } = req.query;
        const data = await prisma.user.findMany({
            skip: Number(skip) || 0,
            take: Number(take) || 10,
        });
        return res.status(status.OK).json(data);
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function registerUser(req: Request, res: Response) {
    try {
        const { username, password, email, phone } = req.body;
        const { hash, salt } = encrypt(password);
        const mBody = {
            currentPassword: hash,
            salt,
            username,
            phone,
            email,
        };

        const data = await prisma.user.create({
            data: mBody,
        });
        return res.status(status.CREATED).json(data);
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function setProfile(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { id } = decodeToken(headers);
        const body = req.body;
        const data = await prisma.profile.upsert({
            where: {
                userId: id,
            },
            create: {
                ...body,
                userId: id,
            },
            update: body,
        });
        return res.status(status.CREATED).json({
            message: 'Profile Created!',
            status: true,
            data,
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { userId } = decodeToken(headers);
        const body = req.body;
        const data = await prisma.user.update({
            where: {
                id: Number(userId),
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

// for development purposes
export async function deleteUser(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.user.delete({
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
