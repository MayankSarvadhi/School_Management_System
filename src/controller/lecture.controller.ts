/* eslint-disable @typescript-eslint/no-unused-vars */
import { LectureScheduleValidator } from '../validation/allComman.Validation';
import { db } from '../models/index';
import { ApplicationController } from './application.controller';

class LectureController extends ApplicationController {
    constructor() {
        super(db.LectureSchema);
    }

    async assignLectureSchedule(req, res, next) {
        const { ClassID, WeekDay, Time } = req.body;
        const { ClassName } = await db.ClassSchema.findOne({ where: { ClassTeacher: req.user.id }});
        const weekDay = new Date(WeekDay).getDay();
        const done = LectureScheduleValidator(weekDay, Time, ClassName);
        if (done.isValid === true) {
            const lecture = await db.LectureSchema.create(req.body);
            return res.status(201).json({ message: 'Lecture scheduled successfully', lecture });
        }
    }
}
export const LectureControllers = new LectureController();
