import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { UserModel } from '../utils/index';
import { hashSync, compareSync } from 'bcrypt';

export const UsersSchema = sequelize.define<UserModel>('userInformation', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    UsersName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['Principal', 'Teacher']
    }

}, {
    hooks: {
        afterValidate: user => {
            user.Password = hashSync(user.Password, 12);
        },
    },
});
UsersSchema.prototype.authenticate = function (value: string) {
    if (compareSync(value, this.Password)) {
        return this;
    } else {
        return false;
    }
};