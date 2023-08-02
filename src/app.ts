import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import { routes } from '../src/routes';
import { logger } from './logger/logger';
import { ErrorHandler } from './middleware';
import passport from 'passport';
import './config/authentication';
dotenv.config();

const port = process.env.PORT || 3000;

export class AppServer {
    private app: Express;

    constructor() {
        this.app = express();
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(passport.initialize());

        this.app.use(routes);
        this.app.use(ErrorHandler);
        this.app.listen(port, () => logger.info(`👍 Server is listening on Port:- ${port}`));
    }
}
new AppServer();

