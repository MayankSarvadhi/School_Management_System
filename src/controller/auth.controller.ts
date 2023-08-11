import { db } from '../models/index';
import dotenv from 'dotenv';
dotenv.config();
import * as jwt from 'jsonwebtoken';
import { AppError, RES_TYPES } from '../utils';

export class AuthControllers {

    async login(req, res, next) {
        const { body: { Email, Password } } = req;
        const result = await db.UsersSchema.findOne({ where: { Email } })
            || await db.StudentDetailsSchema.findOne({ where: { Email } });

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
                message: RES_TYPES.LOGIN
            });
        } else {
            return next(new AppError(RES_TYPES.AUTH_FAIL, 'unauthorized'));
        }
    }

    async logout(req, res, next) {
        if (req.session.token === undefined) throw new AppError(RES_TYPES.ALREADY_LOGOUT, 'invalid_request');
        req.session.destroy(err => {
            if (err) {
                return next(new AppError(RES_TYPES.LOGOUT_FAIL, 'invalid_request'));
            }
            return res.status(200).json({
                success: true,
                statusCode: 200,
                message: RES_TYPES.LOGOUT
            });
        });
    }
}