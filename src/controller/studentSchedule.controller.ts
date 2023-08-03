import { AppError } from '../utils';
import { db } from '../models/index';

class StudentScheduleController {

    async viewSchedule(req, res, next) {
        req.user.Role
            ? 'Student'
            : next(new AppError('You do not have permission to access this route.', 'Forbidden'));
        const date = Object.keys(req.query);
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
            where: { StudentID: req.user.id }
        });
        if (!scheduleData) {
            return next(new AppError('Today has no schedule', 'not_found'));
        }
        return res.status(200).json({
            success: true,
            statusCode: 200,
            data: scheduleData,
            message: 'Data Fetch Successfully'
        });
    }
}

export const StudentScheduleControllers = new StudentScheduleController();
