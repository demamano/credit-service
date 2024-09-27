import status from 'http-status-codes';
import { Request, Response } from 'express';
import prisma from '../../config/prismaClient.config';
import { decodeToken } from '../../utils/jwt';

export async function addPayment(req: Request, res: Response) {
    try {
        const headers = req.header('Authorization');
        const { providerId, id } = decodeToken(headers);

        const body = req.body;
        const creditRe = await prisma.credit.findFirst({
            where: {
                id: body.creditId,
            },
            select: {
                remainingCredit: true,
            },
        });

        console.log(creditRe);

        if (Number(creditRe?.remainingCredit) >= body.amount) {
            const [transaction, user, credit] = await prisma.$transaction([
                prisma.payment.create({
                    data: {
                        providerId,
                        ...body,
                    },
                }),
                prisma.credit.update({
                    where: {
                        id: body.creditId,
                    },
                    data: {
                        remainingCredit: {
                            decrement: body.amount,
                        },
                    },
                }),
                prisma.user.update({
                    where: {
                        id: body.userId,
                    },
                    data: {
                        remainignCredit: {
                            increment: body.amount,
                        },
                        totalCredit: {
                            decrement: body.amount,
                        },
                    },
                }),
            ]);

            console.log(
                `transaction: ${transaction}, user: ${user}, credit: ${credit}`,
            );

            return res.status(status.OK).json({
                user,
                credit,
                transaction,
            });
        } else {
            return res.status(status.OK).json({
                message: 'small amount!!',
            });
        }
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}
