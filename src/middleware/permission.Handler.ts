import { AppError, RES_TYPES } from '../utils';

export default function permit(roles) {
    return function (req, res, next) {
        if (roles.includes(req.user.Role) && req.isAuthenticated()) {
            return next();
        }
        throw new AppError(RES_TYPES.NOT_PERMISSION, 'Forbidden');
    };
}