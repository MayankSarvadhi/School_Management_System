/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError, RES_TYPES } from '../utils';
import { db } from '../models/index';
import { Op } from 'sequelize';
import { ApplicationController } from './application.controller';

class AttendanceController extends ApplicationController {
    constructor() {
        super(db.AttendanceSchema);
    }

    async bulkAttendance(req, res, next) {
        const AttendanceData = await db.AttendanceSchema.bulkCreate(req.body);
        res.status(201).json({
            success: true, StatusCode: 201,
            data: AttendanceData, message: RES_TYPES.CREATE
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
                data: updateAttendance, message: RES_TYPES.UPDATE
            });
        } else {
            return next(new AppError(RES_TYPES.ID_NOT_FOUND, 'not_found'));
        }
    }

    async filterAttendance(req, res, next) {
        const { body: { StartDate, EndDate, Period }, params: { StudentId }} = req;
        const storeDate = req.body.Date;
        let attendance;
        if (Period === 'day' && Date) {
            attendance = await db.AttendanceSchema.findAll({ where: { StudentId, Date: storeDate }});
        }
        if (Period === 'last-week') {
            const lastWeekStart = new Date();
            lastWeekStart.setDate(lastWeekStart.getDate() - 7);
            attendance = await db.AttendanceSchema.findAll({ where: { StudentId, Date: { [Op.between]: [lastWeekStart, new Date()] }}});
        }
        if (Period === 'last-month') {
            const lastMonthStart = new Date();
            lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
            attendance = await db.AttendanceSchema.findAll({ where: { StudentId, Date: { [Op.between]: [lastMonthStart, new Date()] }}});
        }
        if (Period === 'custom' && StartDate && EndDate) {
            attendance = await db.AttendanceSchema.findAll({ where: { StudentId, Date: { [Op.between]: [StartDate, EndDate] }}});
        }
        if (attendance) {
            res.status(200).json({ success: true, StatusCode: 200, data: attendance, message: RES_TYPES.FETCH });
        } else {
            return next(new AppError(RES_TYPES.NO_FOUND, 'not_found'));
        }
    }

}
export const AttendanceControllers = new AttendanceController();

