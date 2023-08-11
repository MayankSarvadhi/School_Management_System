import { Sequelize } from 'sequelize';
import { sequelize } from '../config/db';
import { UsersSchema } from './user.Model';
import { ClassSchema } from './class.Model';
import { AttendanceSchema } from './attendance.model';
import { LectureSchema } from './lecture.model';
import { ReportingSchema } from './reporting.model';
import { StudentsSchema } from './students.model';
import { StudentDetailsSchema } from './studentdetails.model';
import { SubjectSchema } from './subject.model';
import { HoliDaySchema } from './holidays.model';
import { LeaveSchema } from './leave.model';
import { HomeWorkSchema } from './homework.model';

export const db = {
    Sequelize,
    sequelize,
    UsersSchema,
    ClassSchema,
    AttendanceSchema,
    LectureSchema,
    ReportingSchema,
    StudentsSchema,
    StudentDetailsSchema,
    SubjectSchema,
    HoliDaySchema,
    LeaveSchema,
    HomeWorkSchema
};

// db.sequelize.sync();
