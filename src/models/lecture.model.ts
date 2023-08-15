import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { LectureModel } from '../utils';

export const LectureSchema = sequelize.define<LectureModel>('lectureDetails', {
    WeekDay: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    ClassId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'classDetails',
            key: 'id'
        }
    },
    TeacherId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'userInformation',
            key: 'id'
        }
    }
}, {
    indexes: [{
        unique: true,
        fields: ['WeekDay', 'Time', 'ClassId', 'TeacherId']
    }]
});