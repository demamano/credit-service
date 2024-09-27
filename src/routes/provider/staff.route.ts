import { Router } from 'express';

import { validate } from '../../middlewares/validate.middleware';

import {
    me,
    branchStaff,
    createBranchStaff,
    removeBranchStaff,
    generateCompanyStaffData,
} from '../../controllers/provider/staff.controller';

const branchStaffRouter: Router = Router();

branchStaffRouter.get('/staffData', generateCompanyStaffData);
branchStaffRouter.get('/me/:id', branchStaff);
branchStaffRouter.get('/me', me);
branchStaffRouter.post('/addStaff', createBranchStaff);
branchStaffRouter.delete('/removeStaff', removeBranchStaff);
export default branchStaffRouter;
