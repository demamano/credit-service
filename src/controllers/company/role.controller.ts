import status from 'http-status-codes';
import { Request, Response } from 'express';
import { decodeToken } from '../../utils/jwt';
import prisma from '../../config/prismaClient.config';

export async function assignRole(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { companyId } = decodeToken(headers);

        const { roleId, staffId } = req.body;
        const data = await prisma.companyStaff.update({
            where: {
                companyId,
                id: Number(staffId),
            },
            data: {
                roleId,
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

export async function revockRole(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { companyId } = decodeToken(headers);
        const { staffId, roleId } = req.body;
        const data = await prisma.companyStaff.update({
            where: {
                companyId,
                id: Number(staffId),
            },
            data: {
                roleId,
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
