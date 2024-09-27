import { Router } from 'express';
import {
    assignRole,
    revockRole,
} from '../../controllers/company/role.controller';
import { nRoleSchema } from '../../schemas/role.schema';
import { validate } from '../../middlewares/validate.middleware';
const roleRouter: Router = Router();

roleRouter.post('/assign', validate(nRoleSchema), assignRole);
roleRouter.post('/revock', validate(nRoleSchema), revockRole);

export default roleRouter;
