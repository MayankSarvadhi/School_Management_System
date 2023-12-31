import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { HolidaysModel } from '../utils';

export const HoliDaySchema = sequelize.define<HolidaysModel>('holidayDetails', {
    HoliDayName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    indexes: [{
        unique: true,
        fields: ['Date', 'HoliDayName']
    }]
});