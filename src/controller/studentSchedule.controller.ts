import { AppError } from '../utils';
import { db } from '../models/index';

class StudentScheduleController {

    async viewSchedule(req, res, next) {
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
                        WeekDay: (!date.length || date.length === 0)
                            ? toDayDate
                            : date
                    }
                }]
            }],
            where: { StudentID: req.user.id }
        });
        if (scheduleData === null) return next(new AppError('Today have no Schedule', 'not_found'));
        return res.status(200).json({ success: true, statusCode: 200, data: scheduleData, message: 'Data Fetch SuccessFully' });

    }
}

export const StudentScheduleControllers = new StudentScheduleController();
