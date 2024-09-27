import { Router } from 'express';

import { validate } from '../../middlewares/validate.middleware';
import {
    createProviderBranchSchema,
    updateProviderBranchSchema,
    removeProviderBranchSchema,
} from '../../schemas/providerBranch.schema';
import {
    providerBranch,
    me,
    createProviderBranch,
    updateProviderBranch,
    removeProviderBranch,
    providerBranchs,
    generateBranchData,
} from '../../controllers/provider/branch.controller';

const providerBranchRouter: Router = Router();

providerBranchRouter.get('/', providerBranchs);
providerBranchRouter.get('/branchData', generateBranchData);
providerBranchRouter.get('/me', me);
providerBranchRouter.get('/me/:id', providerBranch);
providerBranchRouter.post(
    '/addBranch',
    validate(createProviderBranchSchema),
    createProviderBranch,
);

providerBranchRouter.put(
    '/updateBranch/:id',
    validate(updateProviderBranchSchema),
    updateProviderBranch,
);

providerBranchRouter.delete(
    '/removeBranch/:id',
    validate(removeProviderBranchSchema),
    removeProviderBranch,
);
export default providerBranchRouter;
