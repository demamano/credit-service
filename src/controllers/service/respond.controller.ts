// import status from 'http-status-codes';
// import { Request, Response } from 'express';
// import { decodeToken } from '../../utils/jwt';

// export async function sentRespond(req: Request, res: Response) {
//     try {
//         const headers = req.header('Authorization');
//         const { providerId } = decodeToken(headers);
//         const body = req.body;
//     } catch (err) {
//         return res.status(status.INTERNAL_SERVER_ERROR).json({
//             message: 'Internal error',
//             err,
//         });
//     }
// }
