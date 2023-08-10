import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { SubjectModel } from '../utils';

export const SubjectSchema = sequelize.define<SubjectModel>('subjectDetails', {
    SubjectName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    TeacherId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'userInformations',
            key: 'id'
        }
    }
}, {
    indexes: [{
        unique: true,
        fields: ['SubjectName', 'TeacherId']
    }]
});