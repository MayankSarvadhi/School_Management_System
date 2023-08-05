/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError, NotificationTypes, SendNotificationEmail } from '../utils';
import { db } from '../models/index';
import { ApplicationController } from './application.controller';

class StudentDetailsController extends ApplicationController {
    constructor() {
        super(db.StudentDetailsSchema);
    }

    async createStudents(req,res,next){
        const Data = await db.StudentDetailsSchema.create(req.body);
        res.status(201).json({ success: true, StatusCode: 201, data: Data, message: 'Data Insert Successfully' });
        if(Data){
            const createdData = await db.StudentDetailsSchema.findOne({ where: { GRID: Data.GRID }});
            const StudentId = createdData.id;
            new SendNotificationEmail(NotificationTypes.INVITE,req.body.Email,`http://localhost:3000/details/${StudentId}`);
        }
    }

    async updateOnlyPassword(req,res,next){
        const { id } = req.params;

        const [updated] = await db.StudentDetailsSchema.update(req.body.Password, { where: { id }});
        if (updated) {
            const updatedData = await db.StudentDetailsSchema.findByPk(id);
            return res.json({ success: true, StatusCode: 200, data: updatedData, message: 'Students Password Update Successfully' });
        } else {
            return next(new AppError(`This id = ${id} not found`, 'not_found'));
        }
    }
}
export const StudentDetailsControllers = new StudentDetailsController();

