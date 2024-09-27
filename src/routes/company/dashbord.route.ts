import { Router } from 'express';
import { providerDashbord } from '../../controllers/company/dashbord.controller';

const dashbordRouter: Router = Router();

dashbordRouter.get('/provider', providerDashbord);

export default dashbordRouter;
