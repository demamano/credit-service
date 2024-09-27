import { Router } from 'express';

import { validate } from '../../middlewares/validate.middleware';
import {
    addDocumentSchema,
    updateDocumentSchema,
    removeDocumentSchema,
} from '../../schemas/document.schema';

import {
    document,
    documents,
    addDocument,
    updateDocument,
    removeDocument,
} from '../../controllers/company/document.controller';

const documentRouter: Router = Router();

documentRouter.get('/me/:id', document);
documentRouter.get('/me/', documents);

documentRouter.post('/addDocument', validate(addDocumentSchema), addDocument);

// id - documentRefID
documentRouter.put(
    '/updateDocument/:id',
    validate(updateDocumentSchema),
    updateDocument,
);

documentRouter.delete(
    '/removeDocument/:id',
    validate(removeDocumentSchema),
    removeDocument,
);
export default documentRouter;
