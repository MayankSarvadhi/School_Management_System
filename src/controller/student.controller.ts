import { AppError } from '../utils';
import { db } from '../models/index';
import { ApplicationController } from './application.controller';

class StudentController extends ApplicationController {
    constructor() {
        super(db.StudentsSchema);
    }

    async removeStudentsFromClass(req, res, next) {
        const { params: { id }} = req;
        const removeRecord = await db.StudentsSchema.destroy({ where: { StudentID: id }});
        if (removeRecord) {
            return res.json({ success: true, statusCode: 200, data: removeRecord, message: 'Data deleted Successfully' });
        } else {
            return next(new AppError(`id = ${id}  not found/Match`, 'not_found'));
        }
    }

    async getParticularStudents(req, res, next) {
        const { params: { ClassID }} = req;
        const FilterStudents = await db.StudentsSchema.findAll({ where: { ClassID }});
        if (FilterStudents) {
            return res.status(200).json({ success: true, statusCode: 200, data: FilterStudents, message: 'Data Fetch SuccessFully' });
        } else {
            return next(new AppError(`id = ${ClassID}  not found/Match`, 'not_found'));
        }
    }

}
export const StudentControllers = new StudentController();
