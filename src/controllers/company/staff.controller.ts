import status from 'http-status-codes';
import { Request, Response } from 'express';

import { encrypt } from '../../utils/hash';
import { decodeToken } from '../../utils/jwt';
import prisma from '../../config/prismaClient.config';

export async function companyStaff(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const headers = req.header('Authorization');
        const { companyId } = decodeToken(headers);

        const data = await prisma.companyStaff.findFirst({
            where: {
                AND: [
                    {
                        id: Number(id),
                        companyId,
                    },
                ],
            },
            include: {
                company: true,
                role: true,
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

export async function companyStaffs(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { companyId } = decodeToken(headers);
        const { skip, take } = req.query;
        const data = await prisma.companyStaff.findMany({
            skip: Number(skip) || 0,
            take: Number(take) || 10,
            where: {
                companyId,
            },
            include: {
                role: true,
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

export async function addCompanyStaff(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { companyId } = decodeToken(headers);

        const body = req.body;
        const { username, email, phone, roleId, password } = body;

        const { salt, hash } = encrypt(password);
        const staffBody = {
            companyId,
            currentPassword: hash,
            salt,
            username,
            email,
            phone,
            roleId,
        };

        const data = await prisma.companyStaff.create({
            data: staffBody,
        });
        return res.status(status.CREATED).json(data);
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function updateCompanyStaff(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const body = req.body;
        const data = await prisma.companyStaff.update({
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

// --  for Development Purpose
export async function removeCompanyStaff(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.companyStaff.delete({
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
