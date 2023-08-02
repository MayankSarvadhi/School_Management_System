import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { AuthModel } from '../utils';

export const AuthSchema = sequelize.define<AuthModel>('UserTokens', {
    Token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'userInformations',
            key: 'id'
        }
    }
});