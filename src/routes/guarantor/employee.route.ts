import { Router } from 'express';
import {
    me,
    companyEmployee,
    createGuarantorEmployee,
    updateGuarantorEmployee,
    removeGuarantorEmployee,
} from '../../controllers/guarantor/employee.controller';
import { validate } from '../../middlewares/validate.middleware';
import {
    createdGuarantorEmployeeSchema,
    removeGuarantorEmployeeSchema,
    updatedGuarantorEmployeeSchema,
} from '../../schemas/guarantorEmployee.schema';

const guarantorEmployeeRoute: Router = Router();

guarantorEmployeeRoute.get('/me/:bid', me);
guarantorEmployeeRoute.get('/me/:bid/:id', companyEmployee);
guarantorEmployeeRoute.post(
    '/addEmployee',
    validate(createdGuarantorEmployeeSchema),
    createGuarantorEmployee,
);
guarantorEmployeeRoute.put(
    '/updateEmployee/:id',
    validate(updatedGuarantorEmployeeSchema),
    updateGuarantorEmployee,
);
guarantorEmployeeRoute.delete(
    '/removeEmpoyee/:id',
    validate(removeGuarantorEmployeeSchema),
    removeGuarantorEmployee,
);

export default guarantorEmployeeRoute;
