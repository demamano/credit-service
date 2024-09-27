import { login } from '../../controllers/user/user.auth';
import { Router } from 'express';

const authRouter: Router = Router();

authRouter.post('/login', login);

export default authRouter;
