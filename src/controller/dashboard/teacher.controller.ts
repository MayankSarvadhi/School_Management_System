/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError, RES_TYPES } from '../../utils';
import { db } from '../../models';

class TeacherDashboardController {
    async ViewAllData(req, res, next) {
        const toDayDate = new Date().toISOString().split('T')[0];
        const schedule = await db.LectureSchema.findAll(
            {
                where: {
                    TeacherId: req.user.id,
                    WeekDay: req.body.Date || toDayDate
                }
            });
        console.log(schedule);
        const profile = db.UsersSchema.findByPk(req.user.id);
        if (schedule && profile) {
            const data = { schedule, profile };
            return res.status(200).json({ success: true, data, message: RES_TYPES.FETCH });
        } else {
            throw new AppError(RES_TYPES.NO_FOUND, 'not_found');
        }
    }
}

export const TeacherDashboardControllers = new TeacherDashboardController();