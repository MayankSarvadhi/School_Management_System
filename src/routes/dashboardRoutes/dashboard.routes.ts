import express from 'express';
export const PrincipalRoutes = express.Router();
import { asyncWrapper } from '../../middleware';
import { PrincipalController } from '../../controller';


PrincipalRoutes.get('/',asyncWrapper(PrincipalController.TotalCountRecord));
PrincipalRoutes.post('/',asyncWrapper(PrincipalController.AttendanceData));