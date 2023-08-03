import { AppError } from '../utils';

export default function permit(roles) {
    return function (req, res, next) {
        if (Array.isArray(roles)) {
            if (roles.includes(req.user.Role)) {
                return next();
            }
        } else if (req.user.Role === roles) {
            return next();
        }
        throw new AppError('You do not have permission to access this route.', 'Forbidden');
    };
}