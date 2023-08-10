/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError } from '../utils';
import { db } from '../models/index';
import { ApplicationController } from './application.controller';

class AttendanceController extends ApplicationController {
    constructor() {
        super(db.AttendanceSchema);
    }

    async bulkAttendance(req, res, next) {
        const AttendanceData = await db.AttendanceSchema.bulkCreate(req.body);
        res.status(201).json({
            success: true, StatusCode: 201,
            data: AttendanceData, message: 'Data Insert Successfully'
        });
    }

    async signalUpdate(req, res, next) {
        const { id } = req.params;
        const [{ Status, Date, StudentId }] = req.body;
        const updateAttendance = await db.AttendanceSchema.update(
            { Status, Date, StudentId }, { where: { id }, returning: true });
        if (updateAttendance[0] === 1) {
            return res.json({
                success: true, StatusCode: 200,
                data: updateAttendance, message: 'Data Update Successfully'
            });
        } else {
            return next(new AppError(`This id = ${id} not found`, 'not_found'));
        }
    }
}
export const AttendanceControllers = new AttendanceController();

