import express from 'express';
export const StudentRoutes = express.Router();
import { asyncWrapper } from '../../middleware';
import { StudentDashboardControllers } from '../../controller';

StudentRoutes.get('/student', asyncWrapper(StudentDashboardControllers.ViewAllData));