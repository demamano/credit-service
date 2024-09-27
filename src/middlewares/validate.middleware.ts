import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';

import status from 'http-status-codes';

export const validate =
    (schema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (error) {
            return res.status(status.BAD_REQUEST).json(error);
        }
    };
