import status from 'http-status-codes';
import { Request, Response } from 'express';
import { decodeToken } from '../../utils/jwt';
import prisma from '../../config/prismaClient.config';

export async function userDashbord(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { userId } = decodeToken(headers);

        const user = await prisma.user.findFirst({
            where: {
                id: Number(userId),
            },
            select: {
                creditLimit: true,
                totalCredit: true,
                remainignCredit: true,
            },
        });

        const totalPaidCredit = await prisma.payment.aggregate({
            where: {
                userId: Number(userId),
            },
            _sum: {
                amount: true,
            },
        });

        return res.status(status.OK).json({
            creditLimit: Number(user?.creditLimit),
            totalUnpaidCredit: Number(user?.totalCredit),
            remainingCredit: Number(user?.remainignCredit),
            totalPaidCredit: Number(totalPaidCredit._sum.amount),
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}
