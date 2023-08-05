import express from 'express';
import { asyncWrapper, permit } from '../middleware';
import { StudentValidation } from '../validation/allComman.Validation';
import { StudentDetailsControllers } from '../controller';
import { USER_ROLE } from '../utils';
export const StudentDetailsRoutes = express.Router();

StudentDetailsRoutes.post(
    '/',
    permit(USER_ROLE.TEACHER),
    StudentValidation,
    asyncWrapper(StudentDetailsControllers.createStudents)
);

StudentDetailsRoutes.delete(
    '/:id',
    permit(USER_ROLE.TEACHER),
    asyncWrapper(StudentDetailsControllers.delete.bind(StudentDetailsControllers))
);

StudentDetailsRoutes.put(
    '/:id',
    permit(USER_ROLE.TEACHER),
    StudentValidation,
    asyncWrapper(StudentDetailsControllers.createStudents)
);

StudentDetailsRoutes.patch(
    '/:id',
    permit(USER_ROLE.STUDENT),
    StudentValidation,
    asyncWrapper(StudentDetailsControllers.updateOnlyPassword)
);