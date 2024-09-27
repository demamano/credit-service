import { Router } from 'express';

import { validate } from '../../middlewares/validate.middleware';
import {
    becomeProviderSchema,
    removeProviderSchema,
} from '../../schemas/provider.schema';

import {
    me,
    provider,
    providers,
    becomeProvider,
    removeProvider,
} from '../../controllers/provider/provider.controller';

const providerRouter: Router = Router();

providerRouter.get('/', providers);
providerRouter.get('/me', me);
providerRouter.get('/:id', provider);

providerRouter.post(
    '/becomeProvider',
    validate(becomeProviderSchema),
    becomeProvider,
);

export default providerRouter;
