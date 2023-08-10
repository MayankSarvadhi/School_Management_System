/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError } from '../utils';
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

    async filterAttendance(req, res, next) {
        const { body: { Date, StartDate, EndDate, Period }, params: { StudentId }} = req;
        let attendance;
        if (Period === 'day' && Date) {
            attendance = await db.AttendanceSchema.findOne({ where: { StudentId, Date }});
        }
        if (Period === 'last-week') {
            const lastWeekStart = new Date();
            lastWeekStart.setDate(lastWeekStart.getDate() - 7);
            attendance = await db.AttendanceSchema.findAll({ where: { StudentId, date: { [Op.between]: [lastWeekStart, new Date()] }}});
        }
        if (Period === 'last-month') {
            const lastMonthStart = new Date();
            lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
            attendance = await db.AttendanceSchema.findAll({ where: { StudentId, date: { [Op.between]: [lastMonthStart, new Date()] }}});
        }
        if (Period === 'custom' && StartDate && EndDate) {
            attendance = await db.AttendanceSchema.findAll({ where: { StudentId, date: { [Op.between]: [StartDate, EndDate] }}});
        }
        if (attendance) {
            res.status(200).json({ success: true, StatusCode: 200, data: attendance, message: 'Data Finded Successfully' });
        } else {
            return next(new AppError('This is not found', 'not_found'));
        }
    }

    // async function filterAttendance(predefinedFilter: string) {
    //     const today = new Date();
    //     let startDate: Date, endDate: Date;

    //     switch (predefinedFilter) {
    //       case 'last_month':
    //         startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    //         endDate = new Date(today.getFullYear(), today.getMonth(), 0);
    //         break;
    //       case 'last_week':
    //         startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    //         endDate = today;
    //         break;
    //       case 'last_year':
    //         startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    //         endDate = today;
    //         break;
    //       case 'last_15_days':
    //         startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 15);
    //         endDate = today;
    //         break;
    //       case 'today':
    //         startDate = today;
    //         endDate = today;
    //         break;
    //       default:
    //         // Handle custom datawise filtering here
    //         break;
    //     }
      
    //     const filteredRecords = await db.AttendanceSchema.findAll({
    //       where: {
    //         Date: {
    //           [Op.between]: [startDate, endDate],
    //         },
    //       },
    //     });
      
    //     return filteredRecords;
    //   }
    //   try {
    //     const predefinedFilter = 'last_month'; //req.body
    //     const filteredRecords = await filterAttendance(predefinedFilter);
    //     // res.send();
    //   } catch (error) {
    //     console.error('Error filtering attendance:', error);
    //   }

    //   const predefinedFilter = 'last_month'; // Change this to your desired filter
    //   filterAttendance(predefinedFilter)
    //     .then((filteredRecords) => {
    //       console.log(filteredRecords);
    //     })
    //     .catch((error) => {
    //       console.error('Error filtering attendance:', error);
    //     });

}
export const AttendanceControllers = new AttendanceController();

