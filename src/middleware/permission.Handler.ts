import { AppError } from '../utils';

export default function permit(roles) {
    return function (req, res, next) {
        if (Array.isArray(roles) || req.user.Role === roles) {
            if (roles.includes(req.user.Role)) {
                return next();
            }
            return next();
        }
        throw new AppError('You do not have permission to access this route.', 'Forbidden');
    };
}