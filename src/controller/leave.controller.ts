import { AppError, RES_TYPES } from '../utils';
import { db } from '../models/index';
import { Op } from 'sequelize';
import { ApplicationController } from './application.controller';

class LeaveController extends ApplicationController {
    constructor() {
        super(db.LeaveSchema);
    }

    async LeaveApply(req, res, next) {
        const { id } = req.user;
        const { StartDate, EndDate } = req.body;
        const existingLeave = await db.LeaveSchema.findOne({
            where: {
                [Op.and]: [
                    {
                        [Op.or]: [
                            { StudentId: id },
                            { TeacherId: id }
                        ]
                    },
                    {
                        StartDate: { [Op.lte]: EndDate },
                        EndDate: { [Op.gte]: StartDate }
                    }
                ],
            }
        });
        if (existingLeave) throw new AppError(RES_TYPES.VALID_DATE, 'invalid_request');

        const isHoliday = await db.HoliDaySchema.findOne({
            where: {
                [Op.or]: [
                    { Date: StartDate },
                    { Date: EndDate }
                ]
            }
        });
        if (isHoliday) throw new AppError(RES_TYPES.NOT_APPLY, 'conflict');

        async function checkRole(Tid, Uid, role) {
            req.body.TeacherId = Tid;
            req.body.StudentId = Uid;
            req.body.Role = role;
            const data = await db.LeaveSchema.create(req.body);
            res.status(201).json(
                { success: true, StatusCode: 201, data, message: RES_TYPES.CREATE }
            );
        }
        req.user.Role === 'Teacher'
            ? checkRole(req.user.id, null, req.user.Role)
            : checkRole(null, req.user.id, req.user.Role);

    }

    async DeleteLeave(req, res, next) {
        const { params: { id }} = req;
        const LeaveApproval = await db.LeaveSchema.findOne({ where: { id }});
        if (LeaveApproval.Status === 'approved') throw new AppError(RES_TYPES.NOT_DELETE, 'invalid_request');
        const deleted = await db.LeaveSchema.destroy({ where: { id }});
        if (deleted) {
            return res.json(
                { success: true, statusCode: 200, data: deleted, message: RES_TYPES.DELETE }
            );
        } else {
            return next(new AppError(RES_TYPES.ID_NOT_FOUND, 'not_found'));
        }
    }

    async updateLeave(req, res, next) {
        const { Id } = req.params;
        const { id } = req.user;
        const { StartDate, EndDate } = req.body;
        const existingLeave = await db.LeaveSchema.findOne({
            where: {
                [Op.and]: [
                    {
                        [Op.or]: [
                            { StudentId: id },
                            { TeacherId: id }
                        ]
                    },
                    {
                        StartDate: { [Op.lte]: EndDate },
                        EndDate: { [Op.gte]: StartDate }
                    }
                ],
            }
        });
        if (existingLeave) throw new AppError(RES_TYPES.VALID_DATE, 'invalid_request');
        const isHoliday = await db.HoliDaySchema.findOne({
            where: {
                [Op.or]: [
                    { Date: StartDate },
                    { Date: EndDate }
                ]
            }
        });
        if (isHoliday) throw new AppError(RES_TYPES.NOT_APPLY, 'conflict');
        const [updated] = await db.LeaveSchema.update(req.body, { where: { Id }, returning: true });
        if (updated) {
            return res.json(
                { success: true, StatusCode: 200, data: updated, message: RES_TYPES.UPDATE }
            );
        } else {
            return next(new AppError(RES_TYPES.ID_NOT_FOUND, 'not_found'));
        }
    }

    async PrincipalParticularView(req, res, next) {
        const data = await db.LeaveSchema.findAll({ where: { Role: 'Teacher' }});
        return res.status(200).json({ success: true, data, message: RES_TYPES.FETCH });
    }

    async TeacherParticularView(req, res, next) {

        const datas = await db.ClassSchema.findAll({
            include: [{
                model: db.StudentsSchema,
                attributes: ['StudentId'],
                include: [{
                    model: db.LeaveSchema,
                    attributes: ['StartDate', 'EndDate', 'Reason'],
                    where: { Role: 'Student' }
                }]
            }],
            attributes: ['ClassName', 'Grade', 'ClassTeacher'],
            where: { ClassTeacher: req.user.id }
        });
        return res.status(200).json({ success: true, datas, message: RES_TYPES.FETCH });
    }

    async ApproveLeave(req, res, next) {
        const { id } = req.params;
        const [updated] = await db.LeaveSchema.update(req.body, {
            where: { id },
            returning: true,
            validate: true
        });
        if (updated) {
            return res.json({ success: true, StatusCode: 200, data: updated, message: RES_TYPES.UPDATE });
        } else {
            return next(new AppError(RES_TYPES.ID_NOT_FOUND, 'not_found'));
        }
    }
}
export const LeaveControllers = new LeaveController();
