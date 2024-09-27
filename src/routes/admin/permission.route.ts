import { Router } from 'express';

import { validate } from '../../middlewares/validate.middleware';
import {
    createPermissionSchema,
    updatePermissionSchema,
    removePermissionSchema,
} from '../../schemas/permission.schema';
import {
    permission,
    permissions,
    createPermission,
    updatePermission,
    removePermission,
} from '../../controllers/admin/permission.controller';

const permissionRouter: Router = Router();

permissionRouter.get('/:id', permission);
permissionRouter.get('/', permissions);
permissionRouter.post(
    '/addPermission',
    validate(createPermissionSchema),
    createPermission,
);
permissionRouter.put(
    '/updatePermission/:id',
    validate(updatePermissionSchema),
    updatePermission,
);
permissionRouter.delete(
    '/removePermission/:id',
    validate(removePermissionSchema),
    removePermission,
);
export default permissionRouter;
