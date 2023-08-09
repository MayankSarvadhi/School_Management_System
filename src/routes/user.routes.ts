import express from 'express';
import { asyncWrapper, permit } from '../middleware';
import { ValidationSchema, PasswordUpdateValidation } from '../validation/allComman.Validation';
import { UserControllers } from '../controller';
import passport from 'passport';
export const UserRoutes = express.Router();
import { USER_ROLE } from '../utils';

UserRoutes.post('/',
    // passport.authenticate('jwt', { session: false }),
    // permit([USER_ROLE.PRINCIPAL]),
    ValidationSchema,
    asyncWrapper(UserControllers.createUsers)
);

UserRoutes.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    permit([USER_ROLE.PRINCIPAL]),
    asyncWrapper(UserControllers.delete.bind(UserControllers))
);

UserRoutes.put('/:id',
    passport.authenticate('jwt', { session: false }),
    permit([USER_ROLE.PRINCIPAL]),
    ValidationSchema,
    asyncWrapper(UserControllers.update.bind(UserControllers))
);

UserRoutes.patch('/:id/:token', PasswordUpdateValidation, asyncWrapper(UserControllers.UpdateUsers));
UserRoutes.get('/:id/:token', asyncWrapper(UserControllers.checkJwtToken));

UserRoutes.get('/',
    passport.authenticate('jwt', { session: false }),
    permit([USER_ROLE.PRINCIPAL]),
    asyncWrapper(UserControllers.getData.bind(UserControllers))
);