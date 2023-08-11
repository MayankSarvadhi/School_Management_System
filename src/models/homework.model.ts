import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { HomeWorkModel } from '../utils';

export const HomeWorkSchema = sequelize.define<HomeWorkModel>('homeworkDetails', {

    SubjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'subjectDetails',
            key: 'id'
        }
    },
    // HomeWork: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    Description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    TodayDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    TeacherId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'userInformations',
            key: 'id'
        }
    },
    ClassId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'classDetails',
            key: 'id'
        }
    }

});