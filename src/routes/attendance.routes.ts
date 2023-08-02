import express from 'express';
import { asyncWrapper } from '../middleware';
import { AttendanceValidation } from '../validation/allComman.Validation';
import { AttendanceControllers } from '../controller';
export const AttendanceRoutes = express.Router();

AttendanceRoutes.post('/', AttendanceValidation, asyncWrapper(AttendanceControllers.create.bind(AttendanceControllers)));
AttendanceRoutes.delete('/:id', asyncWrapper(AttendanceControllers.delete.bind(AttendanceControllers)));
AttendanceRoutes.put('/:id', AttendanceValidation, asyncWrapper(AttendanceControllers.update.bind(AttendanceControllers)));
AttendanceRoutes.get('/', asyncWrapper(AttendanceControllers.getData.bind(AttendanceControllers)));