import express from 'express';
export const PrincipalRoutes = express.Router();
import { asyncWrapper } from '../../middleware';
import { PrincipalController } from '../../controller';

PrincipalRoutes.get('/principal',asyncWrapper(PrincipalController.TotalCountRecord));
PrincipalRoutes.post('/principal',asyncWrapper(PrincipalController.AttendanceData));