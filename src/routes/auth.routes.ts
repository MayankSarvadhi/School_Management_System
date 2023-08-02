import express from 'express';
export const AuthRoutes = express.Router();
import { asyncWrapper } from '../middleware';
import { AuthControllers } from '../controller';
import passport from 'passport';

AuthRoutes.post('/login', asyncWrapper(AuthControllers.login));
AuthRoutes.get('/logout', passport.authenticate('jwt', { session: false }), asyncWrapper(AuthControllers.logout));