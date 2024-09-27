import status from 'http-status-codes';
import { Request, Response } from 'express';
import prisma from '../../config/prismaClient.config';
import { json2csv } from 'json-2-csv';

export async function company(req: Request, res: Response) {
    try {
        const params = req.params;
        const data = await prisma.company.findFirst({
            where: {
                id: Number(params.id),
            },
        });

        if (data) {
            return res.status(status.OK).json(data);
        }

        return res.status(status.OK).json({
            message: 'No Data!',
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function companies(req: any, res: Response) {
    try {
        const { skip, take } = req.query;

        const data = await prisma.company.findMany({
            skip: Number(skip) || 0,
            take: Number(take) || 10,
        });

        if (data) {
            return res.status(status.OK).json(data);
        }

        return res.status(status.OK).json({
            message: 'No Data!',
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

// export async function downloadCompanyList(req: any, res: Response) {
//     try {
//         const { skip, take } = req.query;

//         const data = await prisma.company.findMany();

//         if (data) {

//         }

//         return res.status(status.OK).json({
//             message: 'No Data!',
//         });
//     } catch (err) {
//         return res.status(status.INTERNAL_SERVER_ERROR).json({
//             message: 'Internal error',
//             err,
//         });
//     }
// }
// -----------------------

export async function approvedCompanies(req: Request, res: Response) {
    try {
        const { skip, take } = req.query;
        const data = await prisma.company.findMany({
            where: {
                isApproved: true,
            },
        });
        return res.status(status.OK).json({
            status: true,
            mesage: 'Company Approved :)',
            data,
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}
export async function inapprovedCompanies(req: Request, res: Response) {
    try {
        const { skip, take } = req.query;
        const data = await prisma.company.findMany({
            where: {
                isApproved: false,
            },
        });
        return res.status(status.OK).json({
            status: true,
            mesage: 'Company inapproved :(',
            data,
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function inactiveCompanies(req: Request, res: Response) {
    try {
        const { skip, take } = req.query;
        const data = await prisma.company.findMany({
            skip: Number(skip) || 0,
            take: Number(take) || 10,
            where: {
                isActive: false,
            },
        });
        return res.status(status.OK).json({
            status: true,
            mesage: 'Company Account Inactiveed :(',
            data,
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function activeCompanies(req: Request, res: Response) {
    try {
        const { skip, take } = req.query;
        const data = await prisma.company.findMany({
            skip: Number(skip) || 0,
            take: Number(take) || 10,
            where: {
                isActive: true,
            },
        });
        return res.status(status.OK).json({
            status: true,
            mesage: 'Company Account Approve :)',
            data,
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

// ----------------
export async function approveCompany(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.company.update({
            where: {
                id: Number(id),
            },
            data: {
                isApproved: true,
            },
        });
        return res.status(status.OK).json({
            status: true,
            mesage: 'Company Approved :)',
            data,
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}
export async function inapproveCompany(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.company.update({
            where: {
                id: Number(id),
            },
            data: {
                isApproved: false,
            },
        });
        return res.status(status.OK).json({
            status: true,
            mesage: 'Company inapproved :(',
            data,
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function inactiveCompany(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.company.update({
            where: {
                id: Number(id),
            },
            data: {
                isActive: false,
            },
        });
        return res.status(status.OK).json({
            status: true,
            mesage: 'Company Account Inactiveed :(',
            data,
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function activeCompany(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.company.update({
            where: {
                id: Number(id),
            },
            data: {
                isActive: true,
            },
        });
        return res.status(status.OK).json({
            status: true,
            mesage: 'Company Account Approve :)',
            data,
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function staffs(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { skip, take } = req.query;
        const data = await prisma.companyStaff.findMany({
            skip: Number(skip) || 0,
            take: Number(take) || 10,
            where: {
                companyId: Number(id),
            },
            include: {
                role: true,
                company: true,
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

export async function employees(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { skip, take } = req.query;
        const data = await prisma.guarantorBranchEmployee.findMany({
            skip: Number(skip) || 0,
            take: Number(take) || 10,
            where: {
                branchId: Number(id),
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
