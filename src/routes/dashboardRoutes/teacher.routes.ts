import express from 'express';
export const TeacherRoutes = express.Router();
import { asyncWrapper } from '../../middleware';
import { TeacherDashboardControllers } from '../../controller';

TeacherRoutes.get('/teacher', asyncWrapper(TeacherDashboardControllers.ViewAllData));