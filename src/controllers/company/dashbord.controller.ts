import status from 'http-status-codes';
import { Request, Response } from 'express';
import { decodeToken } from '../../utils/jwt';
import prisma from '../../config/prismaClient.config';

export async function providerDashbord(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { providerId } = decodeToken(headers);

        const totalCredit = await prisma.credit.aggregate({
            where: {
                providerId: Number(providerId),
            },
            _sum: {
                totalCredit: true,
            },
        });

        const totalPaidCredit = await prisma.payment.aggregate({
            where: {
                providerId: Number(providerId),
            },
            _sum: {
                amount: true,
            },
        });

        const totalUnpaidCredit = await prisma.credit.aggregate({
            where: {
                providerId: Number(providerId),
            },
            _sum: {
                remainingCredit: true,
            },
        });

        const totalTodayCredit = await prisma.credit.aggregate({
            where: {
                createdAt: {
                    gte: new Date(new Date().toISOString().split('T')[0]),
                    lt: new Date(),
                },
            },
            _sum: {
                amount: true,
            },
        });

        return res.status(status.OK).json({
            totalCredit: totalCredit._sum.totalCredit,
            totalPaidCredit: totalPaidCredit._sum.amount,
            totalUnpaidCredit: totalUnpaidCredit._sum.remainingCredit,
            totalTodayCredit: totalTodayCredit._sum.amount,
            message: 'dashbord/provider',
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}
