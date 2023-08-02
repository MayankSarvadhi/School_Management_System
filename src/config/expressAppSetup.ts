import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import { routes } from '../routes/index';
import { ErrorHandler } from '../middleware';
import passport from 'passport';
import './authentication';
dotenv.config();

export const createApp = (): Express => {
    const app: Express = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(passport.initialize());
    app.use(routes);
    app.use(ErrorHandler);

    return app;
};