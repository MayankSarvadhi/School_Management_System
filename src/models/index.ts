import { Sequelize } from 'sequelize';
import { sequelize } from '../config/db';
import { UsersSchema } from './user.Model';
import { AuthSchema } from './auth.model';
import { ClassSchema } from './class.Model';
import { AttendanceSchema } from './attendance.model';
import { LectureSchema } from './lecture.model';
import { ReportingSchema } from './reporting.model';
import { StudentsSchema } from './students.model';

export const db = {
    Sequelize,
    sequelize,
    UsersSchema,
    AuthSchema,
    ClassSchema,
    AttendanceSchema,
    LectureSchema,
    ReportingSchema,
    StudentsSchema
};

// db.sequelize.sync({ force: false });
