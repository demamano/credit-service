import { Router } from 'express';
import { auth } from '../../middlewares/auth.middleware';
import { me, login, registerKStaff } from '../../controllers/admin/admin.auth';
import { validate } from '../../middlewares/validate.middleware';
import { kuserAuthSchema, kuserSchema } from '../../schemas/kuser.schema';

const authRouter: Router = Router();

authRouter.get('/me', auth, me);
authRouter.post('/login', validate(kuserAuthSchema), login);
authRouter.post('/register', validate(kuserSchema), registerKStaff);

export default authRouter;
