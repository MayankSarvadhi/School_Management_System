import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { UserModel } from '../utils/index';
import { hashSync, compareSync } from 'bcrypt';

export const UsersSchema = sequelize.define<UserModel>('userInformation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    UsersName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false
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
        values: ['Principal', 'Teacher', 'Student']
    }

}, {
    indexes: [{
        unique: true,
        fields: ['UserName', 'FirstName','LastName']
    }],
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