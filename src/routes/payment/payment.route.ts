import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware';
import { addPaymentSchema } from '../../schemas/payment.schema';
import { addPayment } from '../../controllers/payment/payment.controller';

const transactionRoutes: Router = Router();
transactionRoutes.post(
    '/addTransaction',
    validate(addPaymentSchema),
    addPayment,
);

export default transactionRoutes;
