import status from 'http-status-codes';
import { Request, Response } from 'express';
import prisma from '../../config/prismaClient.config';

import { isMatch } from '../../utils/hash';
import { generateToken } from '../../utils/jwt';

export async function login(req: Request, res: Response) {
    try {
        const { username, password } = req.body;
        const user = await prisma.user.findFirst({
            where: {
                username,
            },
            include: {
                workingBranch: true,
            },
        });

        if (!user) {
            return res.status(status.UNAUTHORIZED).json({
                messgae: 'Auth Failed!',
            });
        }
        const data: { password: string; salt: string } = {
            password: user?.currentPassword!,
            salt: user?.salt!,
        };

        const match = isMatch(password, data);
        if (!match) {
            return res.status(status.UNAUTHORIZED).json({
                messgae: 'Auth Failed!',
            });
        }

        const token = generateToken({
            userId: user?.id,
            username: user?.username,
            guarantors: user?.workingBranch,
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
