import { Router } from 'express';

import staffRouter from './staff.route';
import companyRouter from './company.route';
import documentRouter from './document.route';
import dashbordRouter from './dashbord.route';
// import employeeRouter from './employee.route';
import { auth } from '../../middlewares/auth.middleware';
import roleRouter from './role.route';

const companyRoutes: Router = Router();

companyRoutes.use('/dashbord', auth, dashbordRouter);
companyRoutes.use('/document', auth, documentRouter);
// companyRouter.use('/employee', auth, employeeRouter);
companyRouter.use('/role', auth, roleRouter);
companyRoutes.use('/staff', auth, staffRouter);

companyRoutes.use('/', companyRouter);

export default companyRoutes;
