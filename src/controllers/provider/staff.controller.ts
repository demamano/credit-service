import status from 'http-status-codes';

import { Request, Response } from 'express';
import prisma from '../../config/prismaClient.config';
import { decodeToken } from '../../utils/jwt';

import { toCSV } from '../../utils/csv';

export async function generateCompanyStaffData(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { companyId } = decodeToken(headers);
        const staffData = await prisma.companyStaff.findMany({
            where: {
                companyId: Number(companyId),
            },
            select: {
                id: true,
                email: true,
                phone: true,
                isActive: true,
            },
        });

        let { path, csv } = toCSV(staffData);
        res.attachment(path);
        return res.status(200).send(csv);
    } catch (err) {}
}

export async function me(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { id } = decodeToken(headers);

        const data = await prisma.providerBranchStaff.findMany({
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

export async function branchStaff(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.providerBranchStaff.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                branch: true,
                staff: true,
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

export async function branchStaffs(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { companyId } = decodeToken(headers);
        const data = await prisma.providerBranchStaff.findMany({
            where: {
                staff: {
                    companyId: Number(companyId),
                },
            },
            include: {
                staff: true,
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

export async function createBranchStaff(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { companyId } = decodeToken(headers);

        const provider = await prisma.company.findFirst({
            where: {
                id: Number(companyId),
            },
            select: {
                isProvider: true,
            },
        });

        const body = req.body;

        if (provider?.isProvider) {
            const data = await prisma.providerBranchStaff.create({
                data: {
                    ...body,
                },
            });

            return res.status(status.CREATED).json(data);
        } else {
            return res.status(status.NOT_FOUND).json({
                message:
                    'you are not a provider! you need to become a provider before adding branchs.',
            });
        }
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function updateBranchStaff(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const body = req.body;
        const data = await prisma.providerBranchStaff.update({
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

export async function removeBranchStaff(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.providerBranchStaff.delete({
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
