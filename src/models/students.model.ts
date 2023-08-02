import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { StudentsModel } from '../utils';
import { ClassSchema } from './class.Model';

export const StudentsSchema = sequelize.define<StudentsModel>('StudentsClassDetails', {
    ClassID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'classDetails',
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
    }
}, {
    indexes: [{
        unique: true,
        fields: ['StudentID']
    }]
});

StudentsSchema.belongsTo(ClassSchema, { foreignKey: 'ClassID' });
