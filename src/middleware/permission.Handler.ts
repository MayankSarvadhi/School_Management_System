import { AppError } from '../utils';

export default function permit(roles) {
    return function (req, res, next) {
        if (!req.session.token || req.session === undefined) throw new AppError('Please login first', 'unauthorized');

        if (roles.includes(req.user.Role)) {
            console.log('array');

            return next();
        }
        throw new AppError('You do not have permission to access this route.', 'Forbidden');
    };
}