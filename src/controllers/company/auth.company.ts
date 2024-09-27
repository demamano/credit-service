import status from 'http-status-codes';
import { Request, Response } from 'express';
import prisma from '../../config/prismaClient.config';

import { isMatch } from '../../utils/hash';
import { generateToken } from '../../utils/jwt';

export async function login(req: Request, res: Response) {
    try {
        const { username, password } = req.body;
        const staff = await prisma.companyStaff.findFirst({
            where: {
                username,
            },
            include: {
                allocatedBranch: true,
            },
        });

        if (!staff) {
            return res.status(status.UNAUTHORIZED).json({
                messgae: 'Auth Failed!',
            });
        }

        const data: { password: string; salt: string } = {
            password: staff?.currentPassword!,
            salt: staff?.salt!,
        };

        const match = isMatch(password, data);
        if (!match) {
            return res.status(status.UNAUTHORIZED).json({
                messgae: 'Auth Failed!',
            });
        }

        const provider = await prisma.provider.findFirst({
            where: {
                companyId: staff.companyId,
            },
        });

        const company = await prisma.company.findFirst({
            where: {
                id: Number(staff.companyId),
            },
            select: {
                isProvider: true,
                isGuarantor: true,
            },
        });

        console.log(`branchId: ${staff?.allocatedBranch}`)
        const token = generateToken({
            id: staff?.id,
            companyId: staff?.companyId,
            username: staff?.username,
            providerId: provider?.id,
            roleId: staff?.roleId,
            branchId: staff?.allocatedBranch?.id,
            isProvider: company?.isProvider,
            isGuarantor: company?.isGuarantor,
        });

        res.status(status.ACCEPTED).json({
            messge: 'Auth Succesfully :)',
            token,
            isProvider: company?.isProvider,
            isGuarantor: company?.isGuarantor,
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}
