import { Router } from 'express';
import {
    activeProvider,
    approvedProviders,
    approveProvider,
    inactiveProvider,
    inapproveProvider,
    inapprovedProviders,
} from '../../controllers/admin/provider.controller';
import {
    provider,
    providers,
} from '../../controllers/provider/provider.controller';

const providerRoutes: Router = Router();

providerRoutes.get('/', providers);
providerRoutes.get('/:id', provider);
providerRoutes.get('/inapproved', inapprovedProviders);
providerRoutes.get('/approved', approvedProviders);
providerRoutes.get('/active');
providerRoutes.get('/inactive');

// id - providerid
providerRoutes.put('/active/:id', activeProvider);
providerRoutes.put('/approve/:id', approveProvider);
providerRoutes.put('/inactive/:id', inactiveProvider);
providerRoutes.put('/inapprove/:id', inapproveProvider);

export default providerRoutes;
