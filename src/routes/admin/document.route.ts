import { Router } from 'express';

import {
    document,
    documents,
} from '../../controllers/company/document.controller';

import {
    approveDocuments,
    approveSingleDocument,
} from '../../controllers/admin/document.controller';

const documentRoutes: Router = Router();

documentRoutes.get('/:cid/:id', document);
documentRoutes.get('/:cid', documents);

documentRoutes.put('/approveOne/:id', approveSingleDocument);
documentRoutes.put('/approve/:id', approveDocuments);

export default documentRoutes;
