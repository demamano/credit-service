import status from 'http-status-codes';
import { Request, Response } from 'express';

import prisma from '../../config/prismaClient.config';
import { decodeToken } from '../../utils/jwt';
import { toCSV } from '../../utils/csv';

export async function generateEmployeeData(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { companyId } = decodeToken(headers);
        const employess = await prisma.guarantorBranchEmployee.findMany({
            where: {
                id: Number(companyId),
            },
            select: {
                salary: true,
                employeeId: true,
                hiringDate: true,
                user: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
        const userData = employess.map((employee) => {
            return {
                fullname:
                    employee.user.profile?.firstName +
                    ' ' +
                    employee.user.profile?.lastName,
                gender: employee.user.profile?.gender,
                salary: Number(employee?.salary),
                employeeId: employee?.employeeId,
                hiringDate: employee?.hiringDate,
            };
        });

        let { path, csv } = toCSV(userData);
        res.attachment(path);
        return res.status(200).send(csv);
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function companyEmployee(req: Request, res: Response) {
    try {
        const { bid, id } = req.params

        const data = await prisma.guarantorBranchEmployee.findFirst({
            where: {
                AND: [{
                    id: Number(id),
                    branchId: Number(bid),
                }],
            },
            include: {
                user: true,
                branch: true,
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

export async function me(req: Request, res: Response) {
    try {
        const { bid } = req.params

        const data = await prisma.guarantorBranchEmployee.findMany({
            where: {
                branchId: Number(bid),
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

export async function companyEmployees(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { companyId } = decodeToken(headers);

        const data = await prisma.guarantorBranch.findMany({
            where: {
                companyId: Number(companyId),
            },
            include: {
                employees: true,
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
export async function createGuarantorEmployee(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { companyId } = decodeToken(headers);

        const body = req.body;
        const { employee, creditLimitGenerator } = body;

        const company = await prisma.company.findFirst({
            where: {
                id: Number(companyId)
            },
            select: {
                isGuarantor: true,
                autoCreditLimitInPercent: true
            }
        })

        if (company?.isGuarantor) {
            let cl: number;
            if (creditLimitGenerator == 'manual') {
                if (employee.creditLimit == null) {
                    throw new Error('creditLimit required');
                }
                cl = employee.creditLimit;
                console.log(cl)
            } else {
                const percentage: number =
                    company?.autoCreditLimitInPercent !== null
                        ? Number(company?.autoCreditLimitInPercent)
                        : Number(0.2);
                cl = Number((employee.salary * percentage).toFixed(2));
                console.log(cl)
            }

            const employeeData = {
                creditLimit: cl,
                userId: employee.userId,
                employeeId: employee.employeeId,
                salary: employee.salary,
                branchId: employee.branchId,
            };

            const operations = await prisma.$transaction(async (tx) => {
                await tx.guarantorBranchEmployee.create({
                    data: employeeData,
                });

                await tx.user.update({
                    where: {
                        id: employee.userId,
                    },
                    data: {
                        creditLimit: {
                            increment: Number(employeeData.creditLimit),
                        },
                        remainignCredit: {
                            increment: Number(employeeData.creditLimit),
                        },
                    },
                });

                return 'company employee added!';
            });
            return res.status(status.CREATED).json({
                operations,
            });
        } else {
            return res.status(status.NOT_ACCEPTABLE).json({
                message: "You cant add Staffs! You need to become a Guarantor"
            });
        }
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function updateEmployeeSalary(req: Request, res: Response){
    try {
        const body = req.body;
        const { id } = req.params;

        const data = await prisma.guarantorBranchEmployee.update({
            where: {
                id: Number(id)
            },
            data: body
        })

        return res.status(status.OK).json(data)
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function updateGuarantorEmployee(req: Request, res: Response) {
    try {
        const body = req.body;
        const { id } = req.params;

        const data = await prisma.guarantorBranchEmployee.update({
            where: {
                id: Number(id)
            },
            data: body
        })

        return res.status(status.OK).json(data)
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function removeGuarantorEmployee(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.guarantorBranchEmployee.delete({
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
