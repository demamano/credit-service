import { Router } from 'express';

import { validate } from '../../middlewares/validate.middleware';
import {
    addCompanyStaffSchema,
    updateCompanyStaffSchema,
    removeCompanyStaffSchema,
} from '../../schemas/companyStaff.schema';
import {
    companyStaff,
    companyStaffs,
    addCompanyStaff,
    updateCompanyStaff,
    removeCompanyStaff,
} from '../../controllers/company/staff.controller';

const staffRouter: Router = Router();

staffRouter.get('/:id', companyStaff);
staffRouter.get('/', companyStaffs);
staffRouter.post('/addStaff', validate(addCompanyStaffSchema), addCompanyStaff);

staffRouter.put(
    '/updateStaff/:id',
    validate(updateCompanyStaffSchema),
    updateCompanyStaff,
);
staffRouter.delete(
    '/removeStaff/:id',
    validate(removeCompanyStaffSchema),
    removeCompanyStaff,
);
export default staffRouter;
