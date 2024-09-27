import { Router } from 'express';
import transactionRoutes from './payment.route';

const creditRouter: Router = Router();

creditRouter.use('/', transactionRoutes);
