import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { StudentsModel } from '../utils';

export const StudentsSchema = sequelize.define<StudentsModel>('teacherClassData', {
    ClassId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'classDetails',
            key: 'id'
        }
    },
    StudentId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'studentDetails',
            key: 'id'
        }
    }
}, {
    indexes: [{
        unique: true,
        fields: ['StudentId']
    }]
});
