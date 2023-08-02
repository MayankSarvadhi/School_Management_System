import express from 'express';
import { asyncWrapper, permit } from '../middleware';
import { ValidationSchema } from '../validation/allComman.Validation';
import { UserControllers } from '../controller';
import passport from 'passport';
export const UserRoutes = express.Router();
import { USER_ROLE } from '../utils';

UserRoutes.post('/',
    ValidationSchema,
    asyncWrapper(UserControllers.create.bind(UserControllers))
);

UserRoutes.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    permit(USER_ROLE.PRINCIPAL),
    asyncWrapper(UserControllers.delete.bind(UserControllers))
);

UserRoutes.put('/:id',
    passport.authenticate('jwt', { session: false }),
    permit(USER_ROLE.PRINCIPAL),
    ValidationSchema,
    asyncWrapper(UserControllers.update.bind(UserControllers))
);

UserRoutes.get('/',
    passport.authenticate('jwt', { session: false }),
    permit(USER_ROLE.PRINCIPAL),
    asyncWrapper(UserControllers.getData.bind(UserControllers))
);