import express from 'express';
import { asyncWrapper, permit } from '../middleware';
import { LeaveControllers } from '../controller';
import { LeaveValidation } from '../validation/allComman.Validation';
import { USER_ROLE } from '../utils';
export const LeaveRoutes = express.Router();

LeaveRoutes.post('/', permit([USER_ROLE.TEACHER, USER_ROLE.STUDENT]), LeaveValidation, asyncWrapper(LeaveControllers.LeaveApply));
LeaveRoutes.get('/teacher', asyncWrapper(LeaveControllers.PrincipalParticularView));
LeaveRoutes.get('/student', asyncWrapper(LeaveControllers.TeacherParticularView));
LeaveRoutes.put('/:Id', LeaveValidation, asyncWrapper(LeaveControllers.update.bind(LeaveControllers)));
LeaveRoutes.delete('/:id', asyncWrapper(LeaveControllers.DeleteLeave));
LeaveRoutes.patch('/:id',asyncWrapper(LeaveControllers.ApproveLeave));