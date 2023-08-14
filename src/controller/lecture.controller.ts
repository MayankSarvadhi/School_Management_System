/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LectureScheduleValidator } from '../validation/allComman.Validation';
import { db } from '../models/index';
import { ApplicationController } from './application.controller';
import { AppError, RES_TYPES } from '../utils';

class LectureController extends ApplicationController {
    constructor() {
        super(db.LectureSchema);
    }

    async assignLectureSchedule(req, res, next) {
        const { ClassId, WeekDay, Time } = req.body;
        const { ClassName } = await db.ClassSchema.findOne({ where: { ClassTeacher: req.user.id } });
        const weekDay = new Date(WeekDay).getDay();
        const done = LectureScheduleValidator(weekDay, Time, ClassName);
        if (done.isValid === true) {
            const data = await db.ClassSchema.findOne({ where: { id: req.body.ClassId } })
            if(data === null) throw new AppError(RES_TYPES.ID_NOT_FOUND , 'not_found');            
            const lecture = await db.LectureSchema.create(req.body);
            return res.status(201).json({ message: RES_TYPES.CREATE, lecture });
        }
    }
}
export const LectureControllers = new LectureController();
