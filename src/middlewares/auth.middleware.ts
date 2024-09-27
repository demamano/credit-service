import { NextFunction, Response, Request } from 'express';
import status from 'http-status-codes';
import { verifyToken } from '../utils/jwt';

export const auth = (req: any, res: Response, next: NextFunction) => {
    if (!req.header('Authorization')) {
        return res.status(status.UNAUTHORIZED).json({
            message: 'No Bearer Token Found!',
        });
    }

    const token = req.header('Authorization').split(2);
    if (!token) {
        return res.status(status.UNAUTHORIZED).json({
            message: 'No token!',
        });
    }

    const decodedToken = verifyToken(token);
    if (!decodedToken) {
        return res.status(status.UNAUTHORIZED).json({
            messge: 'No token!',
        });
    }

    req.token = decodedToken;
    next();
};
