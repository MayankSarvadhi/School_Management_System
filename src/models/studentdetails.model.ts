import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { StudentDetailsModel } from '../utils/index';
import { hashSync, compareSync } from 'bcrypt';

export const StudentDetailsSchema = sequelize.define<StudentDetailsModel>('studentDetails', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Gender: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['Male', 'Female']
    },
    GRID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    Phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            len: [10, 100]
        }
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 100]
        }
    },
    Role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Student'
    }

}, {
    hooks: {
        afterValidate: user => {
            user.Password = hashSync(user.Password, 12);
        },
    },
});
StudentDetailsSchema.prototype.authenticate = function (value: string) {
    if (compareSync(value, this.Password)) {
        return this;
    } else {
        return false;
    }
};