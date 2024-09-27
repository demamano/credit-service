import { Router } from 'express';
import {
    removeRolePermission,
    rolePermissions,
    setRolePermission,
} from '../../controllers/admin/rolePermissions.controller';
import { validate } from '../../middlewares/validate.middleware';
import { rolePermissionSchema } from '../../schemas/role.schema';

const rolePermissionRouter: Router = Router();

rolePermissionRouter.get('/:id', rolePermissions);
rolePermissionRouter.post(
    '/addRolePermission',
    validate(rolePermissionSchema),
    setRolePermission,
);
rolePermissionRouter.delete(
    '/removeRolePermission',
    validate(rolePermissionSchema),
    removeRolePermission,
);

export default rolePermissionRouter;
