import { Model } from 'sequelize';

export interface UserModel extends Model {
    id: string;
    UsersName: string;
    FirstName: string;
    LastName: string;
    Gender: 'Male' | 'Female';
    Phone: string;
    Email: string;
    Password: string;
    Role: 'Principal' | 'Teacher' | 'Student';
    authenticate(Password: string): boolean | string;
}

export interface StudentDetailsModel extends Model {
    id: string;
    FirstName: string;
    LastName: string;
    GRID: number;
    Gender: 'Male' | 'Female';
    Phone: string;
    Email: string;
    Password: string;
    Role: 'Student';
    authenticate(Password: string): boolean | string;
}

export interface ClassModel extends Model {
    id: any;
    ClassName: string;
    Grade: string;
    ClassTeacher: string
}

export interface AttendanceModel extends Model {
    Status: 'present' | 'absent';
    Date: Date;
    StudentId: string;
}

export interface LectureModel extends Model {
    WeekDay: string;
    Time: string;
    ClassId: string;
}

export interface ReportingModel extends Model {
    TeacherId: string;
    StudentId: string;
    Description: string;
}

export interface StudentsModel extends Model {
    ClassId: string;
    StudentId: string;
}

export interface SubjectModel extends Model {
    SubjectName: string;
    TeacherId: string;
}

export interface HolidaysModel extends Model {
    HoliDayName: string;
    Date: number;
    Description: string;
}

export interface LeaveModel extends Model {
    TeacherId: string;
    StudentId: string;
    Role: 'Teacher' | 'Student';
    StartDate: Date;
    EndDate: Date;
    Reason: string;
    Status: 'pending' | 'approved' | 'rejected';
}