import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { ClassModel } from '../utils';
import { LectureSchema } from '../models/lecture.model';
import { StudentsSchema } from './students.model';

export const ClassSchema = sequelize.define<ClassModel>('classDetails', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    ClassName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Grade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ClassTeacher: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
            model: 'userInformations',
            key: 'id'
        }
    }
}, {
    indexes: [{
        unique: true,
        fields: ['ClassName', 'Grade']
    }]
});

ClassSchema.hasMany(LectureSchema, { foreignKey: 'ClassId' });
ClassSchema.hasMany(StudentsSchema, { foreignKey: 'ClassId' });
StudentsSchema.belongsTo(ClassSchema, { foreignKey: 'ClassId' });

