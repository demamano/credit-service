import status from 'http-status-codes';

import { Request, Response } from 'express';
import prisma from '../../config/prismaClient.config';
import { decodeToken } from '../../utils/jwt';

// import { toCSV } from '../../utils/csv';

// export async function generateBranchData(req: Request, res: Response) {
//     try {
//         const headers = req.header('Authorization');
//         const { companyId } = decodeToken(headers);

//         const branchData = await prisma.guarantorBranch.findMany({
//             where: {
//                 companyId: Number(companyId),
//             },
//             select: {
//                 id: true,
//                 branchName: true,
//                 branchDistrict: true,
//                 branchRegion: true,
//                 branchZone: true,
//                 branchKebele: true,
//             },
//         });

//         let { path, csv } = toCSV(branchData);
//         res.attachment(path);
//         return res.status(200).send(csv);
//     } catch (err) {
//         return res.status(status.INTERNAL_SERVER_ERROR).json({
//             message: 'Internal error',
//             err,
//         });
//     }
// }

export async function me(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { companyId } = decodeToken(headers);

        const data = await prisma.guarantorBranch.findMany({
            where: {
                companyId: Number(companyId),
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

export async function guarantorBranch(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { companyId } = decodeToken(headers);
        const { id } = req.params;
        const data = await prisma.guarantorBranch.findFirst({
            where: {
                AND: [
                    {
                        id: Number(id),
                        companyId: Number(companyId),
                    },
                ],
            },
            include: {
                company: true,
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

export async function guarantorBranchs(req: Request, res: Response) {
    try {
        const data = await prisma.guarantorBranch.findMany();
        return res.status(status.OK).json(data);
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function createGuarantorBranch(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { companyId } = decodeToken(headers);

        const body = req.body;

        const company = await prisma.company.findFirst({
            where: {
                id: Number(companyId),
            },
            select: {
                isGuarantor: true,
            },
        });

        if (company?.isGuarantor) {
            const data = await prisma.guarantorBranch.create({
                data: {
                    companyId,
                    ...body,
                },
            });

            return res.status(status.CREATED).json(data);
        } else{

            return res.status(status.NOT_ACCEPTABLE).json({
                message: "You cant add Branch! You need to become a Guarantor"
            });
        }
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function updateGuarantorBranch(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const body = req.body;
        const data = await prisma.guarantorBranch.update({
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

export async function removeGuarantorBranch(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.guarantorBranch.delete({
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
