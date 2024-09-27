import { Router } from 'express';

import { auth } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import {
    registerCompanySchema,
    updateCompanySchema,
    removeCompanySchema,
} from '../../schemas/company.schema';
import {
    me,
    registerCompany,
    updateCompany,
    removeCompany,
} from '../../controllers/company/company.controller';

const companyRouter: Router = Router();

import { login } from '../../controllers/company/auth.company';

companyRouter.post('/login', login);
companyRouter.post(
    '/registerCompany',
    validate(registerCompanySchema),
    registerCompany,
);

companyRouter.get('/me', auth, me);

companyRouter.put(
    '/updateCompany/:id',
    auth,
    validate(updateCompanySchema),
    updateCompany,
);
companyRouter.delete(
    '/removeCompany/:id',
    auth,
    validate(removeCompanySchema),
    removeCompany,
);
export default companyRouter;
