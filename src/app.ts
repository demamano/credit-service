import cors from 'cors';
import helmet from 'helmet';
import status from 'http-status-codes';
import express, { Request, Response, Express, NextFunction } from 'express';

import routes from './routes';
import logger from './utils/logger';
import { errorHandler } from './middlewares/error.middleware';

const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.get('/', (req: Request, res: Response) => {
    return res.status(status.OK).json({
        message: "It's working!",
    });
});

app.use('/api/v1', routes);
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(status.NOT_FOUND).json({
        message: 'Not Found!',
    });
    next();
});
app.use(errorHandler);

export default app;
