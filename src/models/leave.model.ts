/* eslint-disable max-len */
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { LeaveModel } from '../utils';
import { StudentsSchema } from './students.model';

export const LeaveSchema = sequelize.define<LeaveModel>('leaveDetails', {
    TeacherId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'userInformations',
            key: 'id'
        }
    },
    StudentId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'studentDetails',
            key: 'id'
        }
    },
    Role: {
        type: DataTypes.ENUM,
        values: ['Teacher', 'Student'],
        allowNull: false,
    },
    StartDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    EndDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    Reason: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Status: {
        type: DataTypes.ENUM,
        values: ['pending', 'approved', 'rejected'],
        allowNull: false,
        defaultValue: 'pending',
    }
});
LeaveSchema.belongsTo(StudentsSchema, { foreignKey: 'StudentId' });
StudentsSchema.hasMany(LeaveSchema, { foreignKey: 'StudentId' });