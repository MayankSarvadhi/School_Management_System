/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError, RES_TYPES } from '../../utils';
import { db } from '../../models';

class StudentDashboardController {
    async ViewAllData(req, res, next) {
        const date = req.body.date;
        const toDayDate = new Date().toISOString().split('T')[0];
        const scheduleData = await db.StudentsSchema.findOne({
            include: [{
                model: db.ClassSchema,
                attributes: ['ClassName'],
                include: [{
                    model: db.LectureSchema,
                    attributes: ['Time', 'WeekDay'],
                    where: {
                        WeekDay: (!date.length)
                            ? toDayDate
                            : date
                    }
                }]
            }],
            where: { StudentId: req.user.id }
        });
        if (!scheduleData) {
            return next(new AppError('Today has no schedule', 'not_found'));
        }
        const profileData = await db.StudentDetailsSchema.findByPk(req.user.id);
        const holiday= await db.HoliDaySchema.findAll({});
        const data = { scheduleData,profileData, holiday };
        return res.status(200).json({
            success: true,
            statusCode: 200,
            data,
            message: RES_TYPES.FETCH
        });
    }
}

export const StudentDashboardControllers = new StudentDashboardController();