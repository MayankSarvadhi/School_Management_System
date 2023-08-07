import AppError from './appErrorGenerator';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const tokenStore = {};
const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;

export function CreteToken(id) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    tokenStore[token] = expirationTime;
    return token;
}

export function checkExpJwt(token) {
    const expirationTime = tokenStore[token];
    if (!expirationTime || new Date().getTime() > expirationTime) {
        throw new AppError('Token expired or invalid.', 'invalid_request');
    } else {
        return;
    }
}