import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';
import { logger } from '../logger/logger';
dotenv.config();

export const sequelize = new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD || '', {
    host: process.env.DB_HOST || '',
    dialect: process.env.DB_DIALECT as Dialect,
    port: Number(process.env.DB_PORT),
    // logging: false
});

// DB Connection Check Function:-
(async () => {
    try {
        await sequelize.authenticate();
        logger.info('👍 Connection has been established successfully.');
    } catch (error) {
        logger.error(`👎🏼 Unable to connect to the database: ${error}`);
    }
})();