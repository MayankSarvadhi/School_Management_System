/* eslint-disable max-len */
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { LeaveModel } from '../utils';

export const LeaveSchema = sequelize.define<LeaveModel>('LeaveDetails', {
    TeacherId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'userInformations',
            key: 'id'
        }
    },
    StudentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'studentDetails',
            key: 'id'
        }
    },
    Role: {
        type: DataTypes.ENUM('Teacher', 'Student'),
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
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
    }
}, {
    // hooks: {
    //     beforeSave: async users => {
    //     }
    // }
});