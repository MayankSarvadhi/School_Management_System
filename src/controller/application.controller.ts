/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError, RES_TYPES } from '../utils/index';
import { Request, Response, NextFunction } from 'express';

export class ApplicationController {
    model: any;
    constructor(model: any) {
        this.model = model;
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const Data = await this.model.create(req.body);
        res.status(201).json({ success: true, StatusCode: 201, data: Data, message: RES_TYPES.CREATE });
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const [updated] = await this.model.update(req.body, { where: { id }});
        if (updated) {
            const updatedData = await this.model.findByPk(id);
            return res.json({ success: true, StatusCode: 200, data: updatedData, message: RES_TYPES.UPDATE });
        } else {
            return next(new AppError(RES_TYPES.ID_NOT_FOUND, 'not_found'));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const deleted = await this.model.destroy({ where: { id }});
        if (deleted) {
            return res.json({ success: true, statusCode: 200, data: deleted, message: RES_TYPES.DELETE });
        } else {
            return next(new AppError(RES_TYPES.ID_NOT_FOUND, 'not_found'));
        }
    }

    async getData(req: Request, res: Response, next: NextFunction) {
        const data = await this.model.findAll();
        if (data) {
            return res.status(200).json({ success: false, data, message: RES_TYPES.FETCH });
        }
    }
}