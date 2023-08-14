/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from '../models/index';
import { ApplicationController } from './application.controller';
import { CreteToken, checkExpJwt, NotificationTypes, SendNotificationEmail, AppError, RES_TYPES } from '../utils';

class UserController extends ApplicationController {
    constructor() {
        super(db.UsersSchema);
    }

    async createUsers(req, res, next) {
        const Data = await db.UsersSchema.create(req.body);
        res.status(201).json({ success: true, StatusCode: 201, data: Data, message: RES_TYPES.CREATE });
        const token = CreteToken(Data.id);
        new SendNotificationEmail(
            NotificationTypes.INVITE, req.body.Email,
            `http://192.168.2.70:3000/user/${Data.id}/${token}`
        );
    }

    async checkJwtToken(req, res, next) {
        const { token } = req.params;
        checkExpJwt(token);
        res.render('./newPasswordUser');
    }

    async UpdateUsers(req,res,next){
        const { id, token } = req.params;
        checkExpJwt(token);
        const [updated] = await db.UsersSchema.update(req.body, { where: { id }});
        if (updated) {
            const updatedData = await db.UsersSchema.findByPk(id);
            return res.json({ success: true, StatusCode: 200, data: updatedData, message: RES_TYPES.UPDATE });
        } else {
            return next(new AppError(RES_TYPES.ID_NOT_FOUND, 'not_found'));
        }
    }

}
export const UserControllers = new UserController();
