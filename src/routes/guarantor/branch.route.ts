import { Router } from 'express';
import {
    createGuarantorBranch,
    guarantorBranch,
    me,
    removeGuarantorBranch,
    updateGuarantorBranch,
} from '../../controllers/guarantor/branch.controller';
import { validate } from '../../middlewares/validate.middleware';
import {
    createGuarantorBranchSchema,
    removeGuarantorBranchSchema,
    updateGuarantorBranchSchema,
} from '../../schemas/guarantorBranch.schema';

const guarantorBranchRouter: Router = Router();

guarantorBranchRouter.get('/me/:id', guarantorBranch);
guarantorBranchRouter.get('/me', me);

guarantorBranchRouter.post(
    '/addBranch',
    validate(createGuarantorBranchSchema),
    createGuarantorBranch,
);
guarantorBranchRouter.put(
    '/updateBranch/:id',
    validate(updateGuarantorBranchSchema),
    updateGuarantorBranch,
);
guarantorBranchRouter.delete(
    '/removeBranch/:id',
    validate(removeGuarantorBranchSchema),
    removeGuarantorBranch,
);

export default guarantorBranchRouter;
