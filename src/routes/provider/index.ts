import providerRouter from './provider.route';
import branchStaffRouter from './staff.route';
import providerBranchRouter from './branch.route';

import { Router } from 'express';

const providerRoutes: Router = Router();

providerRoutes.use('/branch', providerBranchRouter);
providerRouter.use('/branch/staff', branchStaffRouter);
providerRoutes.use('/', providerRouter);

export default providerRoutes;
