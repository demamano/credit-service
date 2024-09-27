// import status from 'http-status-codes';
// import { Request, Response } from 'express';
// import prisma from '../../config/prismaClient.config';
// import { decodeToken } from '../../utils/jwt';

// export async function getCredits(req: Request, res: Response) {
//     const headers = req.header('Authorization');
//     const { providerId, id } = decodeToken(headers);

//     try {
//         const data = await prisma.credit.findMany({
//             where: {
//                 providerId: Number(providerId),
//             },
//         });
//         return res.status(status.OK).json(data);
//     } catch (err) {
//         return res.status(status.INTERNAL_SERVER_ERROR).json({
//             message: 'Internal error',
//             err,
//         });
//     }
// }

// export async function addCredit(req: Request, res: Response) {
//     try {
//         const headers = req.header('Authorization');
//         const { providerId, id } = decodeToken(headers);

//         let body = req.body;

//         const [user, provider, credits] = await prisma.$transaction([
//             prisma.user.findFirst({
//                 where: {
//                     id: body.userId,
//                 },
//                 select: {
//                     creditLimit: true,
//                 },
//             }),
//             prisma.provider.findFirst({
//                 where: {
//                     id: providerId,
//                 },
//                 select: {
//                     maximumCredit: true,
//                 },
//             }),
//             prisma.credit.findMany({
//                 where: {
//                     AND: [
//                         {
//                             providerId,
//                             userId: body.userId,
//                         },
//                     ],
//                 },
//                 select: {
//                     amount: true,
//                 },
//             }),
//         ]);

//         if (user) {
//             let amounts: any = credits?.map((credit) => credit?.amount);
//             const totalCredit: number = amounts.reduce(
//                 (a: number, b: number) => Number(a) + Number(b),
//                 0,
//             );
//             console.log(`totalCredit: ${totalCredit}`);
//             console.log(`provider.maximumCredit: ${provider?.maximumCredit}`);

//             const serviceCharge: number = Number(
//                 (body?.amount * 0.2).toFixed(2),
//             );

//             const totalAmount: number = Number(body?.amount) + serviceCharge;
//             console.log(`totalAmount: ${totalAmount}`);
//             console.log(`user.creditLimit: ${user.creditLimit}`);
//             if (
//                 Number(totalAmount) < Number(user.creditLimit) &&
//                 Number(provider?.maximumCredit) > parseFloat(body?.amount) &&
//                 Number(provider?.maximumCredit) >
//                     Number(totalCredit + body?.amount)
//             ) {
//                 console.log(serviceCharge);
//                 console.log(totalAmount);
//                 body = {
//                     providerId,
//                     serviceCharge,
//                     staffId: Number(id),
//                     remainingCredit:
//                         Number(body.amount) + Number(serviceCharge),
//                     totalCredit: Number(body.amount) + Number(serviceCharge),
//                     ...body,
//                 };
//                 const [credit, user] = await prisma.$transaction([
//                     prisma.credit.create({ data: body }),
//                     prisma.user.update({
//                         where: {
//                             id: body.userId,
//                         },
//                         data: {
//                             remainignCredit: {
//                                 decrement: totalAmount,
//                             },
//                             totalCredit: {
//                                 increment: totalAmount,
//                             },
//                         },
//                     }),
//                 ]);

//                 return res.status(status.OK).json({
//                     credit,
//                     user,
//                 });
//             }
//         }

//         return res.status(status.INTERNAL_SERVER_ERROR).json({
//             message: 'Credit Failed!!',
//         });
//     } catch (err) {
//         return res.status(status.INTERNAL_SERVER_ERROR).json({
//             message: 'Internal error',
//             err,
//         });
//     }
// }

// export async function updateCredit(req: Request, res: Response) {
//     try {
//     } catch (err) {
//         return res.status(status.INTERNAL_SERVER_ERROR).json({
//             message: 'Internal error',
//             err,
//         });
//     }
// }
