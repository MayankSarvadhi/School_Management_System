import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { ReportingModel } from '../utils';

export const ReportingSchema = sequelize.define<ReportingModel>('ReportDetails', {
    TeacherID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'userInformations',
            key: 'id'
        }
    },
    StudentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'userInformations',
            key: 'id'
        }
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});