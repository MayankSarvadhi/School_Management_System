import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export function CreteToken(id) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 600 });
    return token;
}

export function checkExpJwt(token) {
    jwt.verify(token, process.env.JWT_SECRET);
}