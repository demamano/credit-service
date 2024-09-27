import { Router } from 'express';

import roleRouter from './role.route';
import serviceRouter from './service.route';
import permissionRouter from './permission.route';
import authRouter from './admin.auth';
import rolePermissionRouter from './rolePermission.route';
import companyRouter from './company.route';
import providerRouter from './provider.route';

import notificationRouter from './notification.route';
import documentRouter from './document.route';
import guarantorRouter from './guarantor.router';

const adminRoutes: Router = Router();

adminRoutes.use('/company', companyRouter);
adminRoutes.use('/document', documentRouter);
adminRoutes.use('/guarantor', guarantorRouter);
adminRoutes.use('/notification', notificationRouter);

adminRoutes.use('/permission', permissionRouter);
adminRoutes.use('/provider', providerRouter);
adminRoutes.use('/role', roleRouter);
adminRoutes.use('/rolePermission', rolePermissionRouter);
adminRoutes.use('/service', serviceRouter);
adminRoutes.use('/', authRouter);

export default adminRoutes;
