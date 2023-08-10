import { AppError } from '../utils';

export default function permit(roles) {
    return function (req, res, next) {
        if (roles.includes(req.user.Role)) {
            return next();
        }
        throw new AppError('You do not have permission to access this route.', 'Forbidden');
    };
}