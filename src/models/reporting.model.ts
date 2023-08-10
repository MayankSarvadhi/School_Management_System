import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { ReportingModel } from '../utils';

export const ReportingSchema = sequelize.define<ReportingModel>('reportDetails', {
    TeacherId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'userInformations',
            key: 'id'
        }
    },
    StudentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'studentDetails',
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