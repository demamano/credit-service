import { Router } from 'express';

import { validate } from '../../middlewares/validate.middleware';
import {
    createRoleSchema,
    updateRoleSchema,
    removeRoleSchema,
} from '../../schemas/role.schema';
import {
    role,
    roles,
    createRole,
    updateRole,
    removeRole,
} from '../../controllers/admin/role.controller';

const roleRouter: Router = Router();

roleRouter.get('/:id', role);
roleRouter.get('/', roles);
roleRouter.post('/addRole', validate(createRoleSchema), createRole);
roleRouter.put('/updateRole/:id', validate(updateRoleSchema), updateRole);
roleRouter.delete('/removeRole/:id', validate(removeRoleSchema), removeRole);
export default roleRouter;
