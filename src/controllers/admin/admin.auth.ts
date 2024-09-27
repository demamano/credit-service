import status from 'http-status-codes';
import { Request, Response } from 'express';
import prisma from '../../config/prismaClient.config';

import { encrypt, isMatch } from '../../utils/hash';
import { decodeToken, generateToken } from '../../utils/jwt';

export async function me(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { id } = decodeToken(headers);

        const data = await prisma.kStaff.findFirst({
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

export async function registerKStaff(req: Request, res: Response) {
    try {
        const body = req.body;
        const { password } = body;
        const { hash, salt } = encrypt(password);
        const data = await prisma.kStaff.create({
            data: {
                ...body,
                password: hash,
                salt,
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

export async function login(req: Request, res: Response) {
    try {
        const { username, password } = req.body;
        const user = await prisma.kStaff.findFirst({
            where: {
                username,
            },
        });

        if (!user) {
            return res.status(status.UNAUTHORIZED).json({
                messgae: 'Auth Failed!',
            });
        }
        const data: { password: string; salt: string } = {
            password: user?.password!,
            salt: user?.salt!,
        };

        const match = isMatch(password, data);
        if (!match) {
            return res.status(status.UNAUTHORIZED).json({
                messgae: 'Auth Failed!',
            });
        }

        const token = generateToken({
            id: user?.id,
        });

        res.status(status.ACCEPTED).json({
            messge: 'Auth Succesfully :)',
            token,
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}
