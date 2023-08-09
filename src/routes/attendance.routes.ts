import express from 'express';
import { asyncWrapper, permit } from '../middleware';
import { AttendanceValidation } from '../validation/allComman.Validation';
import { AttendanceControllers } from '../controller';
import { USER_ROLE } from '../utils';
export const AttendanceRoutes = express.Router();

AttendanceRoutes.post('/',permit([USER_ROLE.TEACHER]) ,AttendanceValidation, asyncWrapper(AttendanceControllers.bulkAttendance));
AttendanceRoutes.delete('/:id',permit([USER_ROLE.TEACHER]) ,asyncWrapper(AttendanceControllers.delete.bind(AttendanceControllers)));
AttendanceRoutes.put('/:id', permit([USER_ROLE.TEACHER]), AttendanceValidation, asyncWrapper(AttendanceControllers.signalUpdate));
AttendanceRoutes.get('/', permit([USER_ROLE.PRINCIPAL, USER_ROLE.TEACHER]), asyncWrapper(AttendanceControllers.getData.bind(AttendanceControllers)));