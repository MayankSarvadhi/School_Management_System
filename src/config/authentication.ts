import dotenv from 'dotenv';
dotenv.config();
import { db } from '../models';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

export default passport.use(new Strategy(opts, async function (jwtPayload, done) {
    try {
        const user = await db.UsersSchema.findOne({ where: { Email: jwtPayload.Email }})
            || await db.StudentDetailsSchema.findOne({ where: { Email: jwtPayload.Email }});
        if (user) {
            return done(null, user);
        }
    } catch (error) {
        return done(error, false);
    }
}));
