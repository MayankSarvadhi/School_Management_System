/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import Joi from 'joi';
import { validateReq } from './validation.Helper';
import { AppError } from '../utils';

class CommanValidationFilter {
    password() {
        return Joi.string()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
            .required()
            .messages({
                'string.pattern.base': 'Password should be this type contain like ex:- Abc@123  ',
                'string.empty': 'Password cannot be empty'
            });
    }
    phone() {
        return Joi.string().pattern(/^\+[0-9]{1,}$/).length(13).required().messages({
            'string.pattern.base': 'Please provide valid phone number with +91 formate',
            'string.empty': 'phone number cannot be empty',
            'string.length': 'Please provide 10 digits phone number'
        });
    }
}

export const ValidationSchema = (req, res, next) => {

    const userSchema = Joi.object({
        UsersName: Joi.string().required(),
        FirstName: Joi.string().required(),
        LastName: Joi.string().required(),
        Gender: Joi.string().valid('Male', 'Female').required(),
        Phone: new CommanValidationFilter().phone(),
        Email: Joi.string().min(10).email().required(),
        Password: new CommanValidationFilter().password(),
        Role: Joi.string().valid('Principal', 'Teacher').required()
    });
    validateReq(req, next, userSchema);
};

export const StudentValidation = (req, res, next) => {
    const studentsSchema = Joi.object({
        FirstName: Joi.string().required(),
        LastName: Joi.string().required(),
        GRID: Joi.number().required(),
        Gender: Joi.string().valid('Male', 'Female').required(),
        Phone: new CommanValidationFilter().phone(),
        Email: Joi.string().min(10).email().required(),
        Password: new CommanValidationFilter().password(),
        Role: Joi.string().default('Student')
    });
    validateReq(req, next, studentsSchema);
};

export const ClassValidation = (req, res, next) => {
    const classSchema = Joi.object({
        ClassName: Joi.string().required(),
        Grade: Joi.string().required(),
        ClassTeacher: Joi.string().required()
    });
    validateReq(req, next, classSchema);
};

export const AttendanceValidation = (req, res, next) => {
    const attendanceSchema = Joi.array().items(
        Joi.object({
            Status: Joi.string().valid('present', 'absent').required(),
            Date: Joi.string().required(),
            StudentId: Joi.string().required()
        })).min(1).required();
    validateReq(req, next, attendanceSchema);
};

export const LectureValidation = (req, res, next) => {
    const lectureSchemas = Joi.object({
        WeekDay: Joi.string().required(),
        Time: Joi.string().required(),
        ClassId: Joi.number().required(),
        TeacherId: Joi.string().required()
    });
    validateReq(req, next, lectureSchemas);
};

export const ReportingValidation = (req, res, next) => {
    const ReportingSchemas = Joi.object({
        TeacherId: Joi.string().required(),
        StudentId: Joi.string().required(),
        Description: Joi.string().required()
    });
    validateReq(req, next, ReportingSchemas);
};

export const PasswordUpdateValidation = (req, res, next) => {
    const studentsSchemas = Joi.object({
        Password: new CommanValidationFilter().password(),
    });
    validateReq(req, next, studentsSchemas);
};

export const HomeworkValidation = (req,res,next) => {
    const HomeWorkSchemas = Joi.object({
        SubjectId: Joi.number().required(),
        HomeWork: Joi.string().required(),
        Description: Joi.string().required(),
        TodayDate: Joi.date().required(),
        TeacherId: Joi.string().required()
    });
    validateReq(req,res,HomeWorkSchemas);
};

export const SubjectValidation = (req, res, next) => {
    const SubjectSchema = Joi.object({
        SubjectName: Joi.string().required(),
        TeacherId: Joi.string().required()
    });
    validateReq(req, next, SubjectSchema);
};

export const LeaveValidation = (req, res, next) => {
    const LeaveSchema = Joi.object({
        StartDate: Joi.date().required(),
        EndDate: Joi.date().required(),
        Reason: Joi.string().required(),
    });
    validateReq(req, next, LeaveSchema);
};

export const HoliDaysValidation = (req, res, next) => {
    const HolidaysSchema = Joi.object({
        HoliDayName: Joi.string().required(),
        Date: Joi.date().required(),
        Description: Joi.string().required()
    });
    validateReq(req, next, HolidaysSchema);
};

export const ScheduleValidation = (req, res, next) => {
    const DateValidation = Joi.date().required();
    validateReq(req, res, DateValidation);
};

export const LectureScheduleValidator = (WeekDay, Time, ClassName) => {

    const isSaturday = WeekDay === 6;
    const isWeekend = WeekDay === 0;
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();
    const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
    let allowedTimeRange;
    if (isSaturday) {
        allowedTimeRange = (ClassName <= 7)
            ? { startTime: '07:00', endTime: '10:00' }
            : { startTime: '12:00', endTime: '15:00' };
    } else {
        allowedTimeRange = (ClassName <= 7)
            ? { startTime: '07:00', endTime: '11:00' }
            : { startTime: '12:00', endTime: '16:00' };
    }

    if (!isSaturday && (isWeekend || WeekDay < currentDayOfWeek || (WeekDay === currentDayOfWeek && Time < currentTime))) {
        throw new AppError('Cannot schedule lectures for past times.', 'invalid_request');
    }

    if (Time < allowedTimeRange.startTime || Time > allowedTimeRange.endTime) {
        throw new AppError('Invalid time for your class schedule.', 'invalid_request');
    }

    if (WeekDay === 0) {
        throw new AppError('Weekend (Saturday/Sunday) schedules are not allowed.', 'invalid_request');
    }
    return { isValid: true };

};