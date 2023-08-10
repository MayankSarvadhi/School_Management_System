import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { AttendanceModel } from '../utils';

export const AttendanceSchema = sequelize.define<AttendanceModel>('attendanceData', {
    Status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['present', 'absent']
    },
    Date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    StudentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'studentDetails',
            key: 'id'
        }
    }
}, {
    timestamps: true,

    indexes: [{
        unique: true,
        fields: ['StudentId', 'Date']
    }]
});