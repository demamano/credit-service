import { Router } from 'express';
import {
    guarantor,
    guarantors,
} from '../../controllers/admin/guarantor.controller';

const guarantorRouter: Router = Router();

guarantorRouter.get('/:id', guarantor);
guarantorRouter.get('/', guarantors);

export default guarantorRouter;
