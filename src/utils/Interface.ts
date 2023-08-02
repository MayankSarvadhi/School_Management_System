import { Model } from 'sequelize';

export interface UserModel extends Model {
    id: number;
    UserName: string;
    Email: string;
    Password: string;
    Role: 'Principal' | 'Teacher' | 'Student';
    authenticate(Password: string): boolean | string;
}

export interface AuthModel extends Model {
    Token: string;
    UserID: number;
}

export interface ClassModel extends Model {
    ClassName: string;
    Grade: string;
    ClassTeacher: string
}

export interface AttendanceModel extends Model {
    Status: 'present' | 'absent';
    Date: Date;
    StudentID: number;
}

export interface LectureModel extends Model {
    WeekDay: string;
    Time: string;
    ClassID: string;
}

export interface ReportingModel extends Model {
    TeacherID: number;
    StudentID: number;
    Description: string;
}

export interface StudentsModel extends Model {
    classDetail: any;
    length: number;
    ClassID : number;
    StudentID : number;
}