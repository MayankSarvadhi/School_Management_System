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
        const result = await db.UsersSchema.findOne({ where: { Email }})
            || await db.StudentDetailsSchema.findOne({ where: { Email }});

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
            req.session.token = token;
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
        if (req.session.token === undefined) throw new AppError('Users Already Logout', 'invalid_request');
        req.session.destroy(err => {
            if (err) {
                return next(new AppError('logout Failed', 'invalid_request'));
            }
            return res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'User Logged out Successfully'
            });
        });
    }
}
export const AuthControllers = new AuthController();
