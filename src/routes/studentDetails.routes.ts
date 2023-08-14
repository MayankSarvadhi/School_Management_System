import express from 'express';
import { asyncWrapper, permit } from '../middleware';
import { StudentValidation, PasswordUpdateValidation } from '../validation/allComman.Validation';
import { StudentDetailsControllers } from '../controller';
import { USER_ROLE } from '../utils';
import passport from 'passport';
export const StudentDetailsRoutes = express.Router();

StudentDetailsRoutes.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    permit([USER_ROLE.TEACHER]),
    StudentValidation,
    asyncWrapper(StudentDetailsControllers.createStudents)
);

StudentDetailsRoutes.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    permit([USER_ROLE.TEACHER]),
    asyncWrapper(StudentDetailsControllers.delete.bind(StudentDetailsControllers))
);

StudentDetailsRoutes.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    permit([USER_ROLE.TEACHER]),
    StudentValidation,
    asyncWrapper(StudentDetailsControllers.update.bind(StudentDetailsControllers))
);

StudentDetailsRoutes.get('/:id/:token', asyncWrapper(StudentDetailsControllers.checkJwt));

StudentDetailsRoutes.post(
    '/:id/:token',
    PasswordUpdateValidation,
    asyncWrapper(StudentDetailsControllers.updateOnlyPassword)
);