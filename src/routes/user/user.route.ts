import { auth } from '../../middlewares/auth.middleware';
import {
    me,
    deleteUser,
    registerUser,
    setProfile,
    updateUser,
} from '../../controllers/user/user.controller';

import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware';
import { registerUserSchema } from '../../schemas/user.schema';
import { userDashbord } from '../../controllers/user/dashbord.controller';

const userRoutes: Router = Router();

userRoutes.get('/me', auth, me);
userRoutes.get('/dashbord', auth, userDashbord);
userRoutes.post('/registerUser', validate(registerUserSchema), registerUser);
userRoutes.put('/setProfile', auth, setProfile);
userRoutes.put('/updateUser', auth, updateUser);
userRoutes.delete('/deleteUser', auth, deleteUser);

export default userRoutes;
