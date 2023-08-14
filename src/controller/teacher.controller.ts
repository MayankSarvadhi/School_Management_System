/* eslint-disable max-len */
import { AppError, RES_TYPES } from '../utils';
import { db } from '../models/index';
import { ApplicationController } from './application.controller';

class StudentController extends ApplicationController {
    constructor() {
        super(db.StudentsSchema);
    }

    async removeStudentsFromClass(req, res, next) {
        const { params: { id }} = req;
        const removeRecord = await db.StudentsSchema.destroy({ where: { StudentId: id }});
        if (removeRecord) {
            return res.json({ success: true, statusCode: 200, data: removeRecord, message: RES_TYPES.DELETE });
        } else {
            return next(new AppError(RES_TYPES.ID_NOT_FOUND, 'not_found'));
        }
    }

    async getParticularStudents(req, res, next) {
        const { params: { ClassId }} = req;
        const FilterStudents = await db.StudentsSchema.findAll({ where: { ClassId }});
        if (FilterStudents) {
            return res.status(200).json({ success: true, statusCode: 200, data: FilterStudents, message: RES_TYPES.FETCH });
        } else {
            return next(new AppError(RES_TYPES.ID_NOT_FOUND, 'not_found'));
        }
    }

}
export const StudentControllers = new StudentController();
