import { Router } from 'express';

import userRoutes from './user';
import adminRoutes from './admin';
import companyRoutes from './company';
import providerRoutes from './provider';
import guarantorRoutes from './guarantor';
// import creditRoutes from './credit/credit.route';
import transactionRoutes from './payment/payment.route';

import { auth } from '../middlewares/auth.middleware';

const routes: Router = Router();

routes.use('/admin', adminRoutes);
routes.use('/company', companyRoutes);
// routes.use('/credit', creditRoutes);
routes.use('/guarantor', auth, guarantorRoutes);
routes.use('/provider', auth, providerRoutes);
routes.use('/transaction', auth, transactionRoutes);
routes.use('/', userRoutes);

export default routes;
