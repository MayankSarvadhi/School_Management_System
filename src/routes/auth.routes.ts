import express from 'express';
export const AuthRoutes = express.Router();
import { asyncWrapper } from '../middleware';
import { AuthControllers } from '../controller';
import passport from 'passport';

const Auth = new AuthControllers();
AuthRoutes.post('/login', asyncWrapper(Auth.login));
AuthRoutes.get('/logout', passport.authenticate('jwt', { session: false }), asyncWrapper(Auth.logout));