import { Router } from 'express';

import guarantorRouter from './guarantor.route';
import guarantorBranchRouter from './branch.route';
import guarantorEmployeeRoute from './employee.route';

const guarantorRoutes: Router = Router();

guarantorRouter.use('/branch', guarantorBranchRouter);
guarantorRouter.use('/branch/employee', guarantorEmployeeRoute);
guarantorRoutes.use('/', guarantorRouter);

export default guarantorRoutes;
