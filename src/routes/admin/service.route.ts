import { Router } from 'express';

import { validate } from '../../middlewares/validate.middleware';
import {
    createServiceSchema,
    updateServiceSchema,
    removeServiceSchema,
} from '../../schemas/service.schema';
import {
    service,
    services,
    createService,
    updateService,
    removeService,
} from '../../controllers/admin/service.controller';

const serviceRouter: Router = Router();

serviceRouter.get('/:id', service);
serviceRouter.get('/', services);
serviceRouter.post('/addService', validate(createServiceSchema), createService);
serviceRouter.put(
    '/updateService/:id',
    validate(updateServiceSchema),
    updateService,
);
serviceRouter.delete(
    '/removeService/:id',
    validate(removeServiceSchema),
    removeService,
);
export default serviceRouter;
