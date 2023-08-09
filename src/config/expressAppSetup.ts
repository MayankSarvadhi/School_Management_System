import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import { routes } from '../routes/index';
import { ErrorHandler, responseHandler } from '../middleware';
import passport from 'passport';
import session from 'express-session';
import './authentication';
dotenv.config();

export const createApp = (): Express => {
    const app: Express = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(
        session({
            secret: process.env.SECRET,
            resave: true,
            saveUninitialized: true,
            cookie: {
                maxAge: 60 * 60 * 60
            }
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(responseHandler);
    app.use(routes);
    app.use(ErrorHandler);

    return app;
};