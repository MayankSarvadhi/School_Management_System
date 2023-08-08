import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { AttendanceModel } from '../utils';

export const AttendanceSchema = sequelize.define<AttendanceModel>('AttendanceDatas', {
    Status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['present', 'absent']
    },
    Date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    StudentID: {
        type: DataTypes.INTEGER,
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
        fields: ['StudentID', 'Date']
    }]
});