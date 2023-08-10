/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from '../models/index';
import { ApplicationController } from './application.controller';
import { CreteToken, checkExpJwt, NotificationTypes, SendNotificationEmail, AppError } from '../utils';

class UserController extends ApplicationController {
    constructor() {
        super(db.UsersSchema);
    }

    async createUsers(req, res, next) {
        const Data = await db.UsersSchema.create(req.body);
        res.status(201).json({ success: true, StatusCode: 201, data: Data, message: 'Data Insert Successfully' });
        const token = CreteToken(Data.id);
        new SendNotificationEmail(
            NotificationTypes.INVITE, req.body.Email,
            `http://192.168.2.70:3000/user/${Data.id}/${token}`,
            token
        );
    }

    async checkJwtToken(req, res, next) {
        const { token } = req.params;
        checkExpJwt(token);
        return res.status(200).json({ success: true, statusCode: 200, message: 'Link get successFully' });
    }

    async UpdateUsers(req,res,next){
        const { id, token } = req.params;
        checkExpJwt(token);
        const [updated] = await db.UsersSchema.update(req.body, { where: { id }});
        if (updated) {
            const updatedData = await db.UsersSchema.findByPk(id);
            return res.json({ success: true, StatusCode: 200, data: updatedData, message: 'Users Password Update Successfully' });
        } else {
            return next(new AppError(`This id = ${id} not found`, 'not_found'));
        }
    }

}
export const UserControllers = new UserController();
