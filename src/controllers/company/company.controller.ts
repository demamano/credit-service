import status from 'http-status-codes';

import { encrypt } from '../../utils/hash';
import { Request, Response } from 'express';
import { decodeToken } from '../../utils/jwt';
import prisma from '../../config/prismaClient.config';

export async function me(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { companyId } = decodeToken(headers);

        const data = await prisma.company.findFirst({
            where: {
                id: Number(companyId),
            },
            include: {
                provider: {
                    include: {
                        services: true,
                    },
                },
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

export async function company(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.company.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                address: true,
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
        const { take, skip } = req.query;
        const data = await prisma.company.findMany({
            skip: Number(skip) || 0,
            take: Number(take) || 10,
            include: {
                address: true,
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

export async function registerCompany(req: Request, res: Response) {
    try {
        const body = req.body;

        // let documentList= []
        // if(body.document){
        //     documentList = body.documents.map((document: any)=>{
        //         return {
        //             companyId: company.id,
        //             ...document
        //         }
        //     })
        // }

        const companyBody = {
            ...body.company,
        };
        const operation = await prisma.$transaction(async (tx) => {
            const company = await tx.company.create({
                data: companyBody,
            });

            const { username, email, phone, roleId, password } = body.admin;

            const { salt, hash } = encrypt(password);
            const adminBody = {
                companyId: company?.id,
                currentPassword: hash,
                salt,
                username,
                email,
                phone,
                roleId,
                userType: 'owner',
            };

            const staff = await tx.companyStaff.create({
                data: adminBody,
            });

            console.log(staff);

            if (body.type == 'provider') {
                await tx.company.update({
                    where: {
                        id: Number(company.id),
                    },
                    data: {
                        isProvider: true,
                    },
                });
                await tx.provider.create({
                    data: {
                        companyId: Number(company.id),
                        ...body.provider,
                    },
                });
                return 'service provider company created!';
            } else if (body.type == 'guarantor') {
                await tx.company.update({
                    where: {
                        id: Number(company.id),
                    },
                    data: {
                        isGuarantor: true,
                    },
                });

                return 'guarantor company created!';
            } else {
                // await tx.provider.create({
                //     data: {
                //         companyId: Number(company.id),
                //         ...body.provider,
                //     },
                // });

                // await tx.company.update({
                //     where: {
                //         id: company.id,
                //     },
                //     data: {
                //         isProvider: true,
                //         isGuarantor: true,
                //     },
                // });

                return 'you become corporate, you can get creadit from other providers! enjoy';
            }
        });

        return res.status(status.OK).json({ operation });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function updateCompany(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { companyId } = decodeToken(headers);

        const body = req.body;
        const company = await prisma.company.findFirst({
            where: {
                id: Number(companyId),
            },
        });

        if (company == null) {
            return res.status(status.BAD_REQUEST).json({
                message: 'You cannot update this company',
            });
        }
        const data = await prisma.company.update({
            where: {
                id: company?.id,
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

// Only for development purpose
export async function removeCompany(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.company.delete({
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
