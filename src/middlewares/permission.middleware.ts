import { decodeToken } from '../utils/jwt';
import { NextFunction, Request, Response } from 'express';

export const permissions = (req: any, res: Response, next: NextFunction) => {
    return function (permission: []) {
        const token = req.header('Authorization').split(' ')[1];
        const userData = decodeToken(token);
    };
};
