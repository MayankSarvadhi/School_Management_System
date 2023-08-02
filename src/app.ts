import { createApp } from './config/expressAppSetup';
import { logger } from './logger/logger';
const port = process.env.PORT || 3000;

export class AppServer {
    constructor() {
        const app = createApp();
        app.listen(port, () => {
            logger.info(`👍 Server is listening on Port:- ${port}`);
        });
    }
}
new AppServer();
