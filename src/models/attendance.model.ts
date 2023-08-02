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
            model: 'userInformations',
            key: 'id'
        }
    }
}, {
    indexes: [{
        unique: true,
        fields: ['StudentID', 'Date']
    }]
});