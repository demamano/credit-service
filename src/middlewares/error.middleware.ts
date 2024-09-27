import status from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

type ExpressError = {
    status: number;
    message: string;
};

export const errorHandler = (
    error: ExpressError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    res.status(error.status || status.INTERNAL_SERVER_ERROR);
    res.json({
        message: error.message || 'Oops! Something went wrong! :(',
    });
    next();
};
