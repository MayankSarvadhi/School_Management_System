/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError, NotificationTypes, SendNotificationEmail, checkExpJwt, CreteToken } from '../utils';
import { db } from '../models/index';
import { ApplicationController } from './application.controller';

class StudentDetailsController extends ApplicationController {
    constructor() {
        super(db.StudentDetailsSchema);
    }

    async createStudents(req, res, next) {
        const Data = await db.StudentDetailsSchema.create(req.body);
        res.status(201).json({ success: true, StatusCode: 201, data: Data, message: 'Data Insert Successfully' });
        const token = CreteToken(Data.id);
        new SendNotificationEmail(NotificationTypes.INVITE, req.body.Email, `http://localhost:3000/details/${Data.id}/${token}`, token);
    }

    async checkJwt(req, res, next) {
        const { token } = req.params;
        checkExpJwt(token);
        return res.status(200).json({ success: true, statusCode: 200, message: 'Link get successFully' });
    }

    async updateOnlyPassword(req, res, next) {
        const { id, token } = req.params;
        checkExpJwt(token);
        const [updated] = await db.StudentDetailsSchema.update(req.body, { where: { id }});
        if (updated) {
            const updatedData = await db.StudentDetailsSchema.findByPk(id);
            return res.json({ success: true, StatusCode: 200, data: updatedData, message: 'Students Password Update Successfully' });
        } else {
            return next(new AppError(`This id = ${id} not found`, 'not_found'));
        }
    }
}
export const StudentDetailsControllers = new StudentDetailsController();