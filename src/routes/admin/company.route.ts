import { Router } from 'express';

import {
    staffs,
    company,
    companies,
    employees,
    activeCompany,
    approveCompany,
    inapproveCompany,
    inactiveCompany,
    inactiveCompanies,
    activeCompanies,
    approvedCompanies,
    inapprovedCompanies,
} from '../../controllers/admin/company.controller';

import { registerCompany } from '../../controllers/company/company.controller';
import { validate } from '../../middlewares/validate.middleware';
import { registerCompanySchema } from '../../schemas/company.schema';

const companyRoutes: Router = Router();

companyRoutes.get('/', companies);

companyRoutes.get('/active', activeCompanies);
companyRoutes.get('/approved', approvedCompanies);
companyRoutes.get('/inactive', inactiveCompanies);
companyRoutes.get('/inapproved', inapprovedCompanies);

companyRoutes.put('/active/:id', activeCompany);
companyRoutes.put('/approve/:id', approveCompany);
companyRoutes.get('/employee/:id', employees);
companyRoutes.put('/inactive/:id', inactiveCompany);
companyRoutes.put('/inapprove/:id', inapproveCompany);
companyRoutes.get('/staff/:id', staffs);
companyRoutes.get('/:id', company);

companyRoutes.post(
    '/registerCompany',
    validate(registerCompanySchema),
    registerCompany,
);

export default companyRoutes;
