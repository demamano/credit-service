import { Router } from 'express';
import {
    getCompanyNotification,
    getNotification,
    createNotification,
} from '../../controllers/admin/notification.controller';
const notificationRouter: Router = Router();

notificationRouter.get('/allNotification/:id', getCompanyNotification);
notificationRouter.get('/:id', getNotification);
notificationRouter.post('/createNotification', createNotification);

export default notificationRouter;
