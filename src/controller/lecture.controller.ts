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
        const ClassName = await db.ClassSchema.findOne({ where: { id: ClassID }});
        const weekDay = new Date(WeekDay).getDay();
        LectureScheduleValidator(weekDay, Time ,ClassName);
        const lecture = await db.LectureSchema.create({ ClassID, weekDay, Time });
        return res.status(201).json({ message: 'Lecture scheduled successfully', lecture });
    }

}
export const LectureControllers = new LectureController();
