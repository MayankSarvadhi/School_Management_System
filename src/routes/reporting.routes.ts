import express from 'express';
import { asyncWrapper } from '../middleware';
import { ReportingValidation } from '../validation/allComman.Validation';
import { ReportingControllers } from '../controller';
export const ReportingRoutes = express.Router();

ReportingRoutes.post('/', ReportingValidation, asyncWrapper(ReportingControllers.create.bind(ReportingControllers)));
ReportingRoutes.delete('/:id', asyncWrapper(ReportingControllers.delete.bind(ReportingControllers)));
ReportingRoutes.put('/:id', ReportingValidation, asyncWrapper(ReportingControllers.update.bind(ReportingControllers)));
ReportingRoutes.get('/', asyncWrapper(ReportingControllers.getData.bind(ReportingControllers)));