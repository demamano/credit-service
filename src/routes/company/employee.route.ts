// import { Router } from 'express';

// import { validate } from '../../middlewares/validate.middleware';
// import {
//     createdCompanyEmployeeSchema,
//     updatedCompanyEmployeeSchema,
//     removeCompanyEmployeeSchema,
// } from '../../schemas/companyEmployee.schema';
// import {
//     companyEmployee,
//     companyEmployees,
//     createCompanyEmployee,
//     updateCompanyEmployee,
//     removeCompanyEmployee,
//     generateEmployeeData,
// } from '../../controllers/guarantor/employee.controller';

// const companyEmployeeRouter: Router = Router();

// companyEmployeeRouter.get('/employeeData', generateEmployeeData);
// companyEmployeeRouter.get('/:id', companyEmployee);
// companyEmployeeRouter.get('/', companyEmployees);

// companyEmployeeRouter.post(
//     '/addEmployee',
//     validate(createdCompanyEmployeeSchema),
//     createCompanyEmployee,
// );

// companyEmployeeRouter.put(
//     '/updateEmployee/:id',
//     validate(updatedCompanyEmployeeSchema),
//     updateCompanyEmployee,
// );

// companyEmployeeRouter.delete(
//     '/removeEmployee/:id',
//     validate(removeCompanyEmployeeSchema),
//     removeCompanyEmployee,
// );
// export default companyEmployeeRouter;
