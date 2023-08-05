/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from '../models/index';
import { ApplicationController } from './application.controller';
import { NotificationTypes, SendNotificationEmail } from '../utils';

class UserController extends ApplicationController {
    constructor() {
        super(db.UsersSchema);
    }

    async createUsers(req, res, next) {
        const Data = await db.UsersSchema.create(req.body);
        res.status(201).json({ success: true, StatusCode: 201, data: Data, message: 'Data Insert Successfully' });
        new SendNotificationEmail(NotificationTypes.INVITE, req.body.email, req.body.password);
    }
}
export const UserControllers = new UserController();
