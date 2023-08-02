import { db } from '../models/index';
import dotenv from 'dotenv';
dotenv.config();
import * as jwt from 'jsonwebtoken';
import { ApplicationController } from './application.controller';
import { AppError } from '../utils';

class AuthController extends ApplicationController {

    constructor() {
        super(db.AuthSchema);
    }

    async login(req, res, next) {
        const { body: { Email, Password }} = req;
        const result = await db.UsersSchema.findOne({ where: { Email }});

        if (result && result.authenticate(Password)) {
            const payload = {
                id: result.id,
                Email: result.Email
            };
            const token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXP, algorithm: 'HS256' }
            );
            const [rowsAffected] = await db.AuthSchema.update(
                { Token: token },
                { where: { userID: result.id }}
            );
            if (rowsAffected === 0) {
                await db.AuthSchema.create({ Token: token, userID: payload.id });
            }
            return res.status(200).json({
                success: true,
                data: token,
                message: 'Congrats! You have Successfully logged in'
            });
        } else {
            return next(new AppError('Authentication failed. Wrong Password or email', 'unauthorized'));
        }
    }

    async logout(req, res, next) {
        const { user: { id }} = req;

        const out = await db.AuthSchema.destroy({ where: { userID: id }});
        if (out) {
            return res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'User Logged out Successfully'
            });
        } else {
            return next(new AppError('logout Failed', 'invalid_request'));
        }
    }
}
export const AuthControllers = new AuthController();
