import authRouter from './user.auth';
import userRouter from './user.route';

import { Router } from 'express';

const userRoutes: Router = Router();

userRoutes.use('/auth', authRouter);
userRoutes.use('/user', userRouter);

export default userRoutes;
