import { Router } from 'express';
import {
    guarantor,
    becomeGuarantor,
    removeGuarantor,
} from '../../controllers/guarantor/guarantor.controller';

const guarantorRouter: Router = Router();

guarantorRouter.get('/:id', guarantor);
guarantorRouter.post('/becomeGuarantor', becomeGuarantor);
guarantorRouter.post('/removeGuarantor/:id', removeGuarantor);

export default guarantorRouter;
