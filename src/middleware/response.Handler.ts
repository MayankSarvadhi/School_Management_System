import { logger } from '../logger/logger';

export const responseHandler = (req, res, next) => {
    logger.info(`${res.statusCode} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    next();
};