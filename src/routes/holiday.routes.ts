import express from 'express';
import { asyncWrapper } from '../middleware';
import { HoliDayControllers } from '../controller';
import { HoliDaysValidation } from '../validation/allComman.Validation';
export const HolidaysRoutes = express.Router();

HolidaysRoutes.post('/', HoliDaysValidation, asyncWrapper(HoliDayControllers.create.bind(HoliDayControllers)));
HolidaysRoutes.get('/', asyncWrapper(HoliDayControllers.getData.bind(HoliDayControllers)));
HolidaysRoutes.put('/:id', HoliDaysValidation, asyncWrapper(HoliDayControllers.update.bind(HoliDayControllers)));
HolidaysRoutes.delete('/:id', asyncWrapper(HoliDayControllers.delete.bind(HoliDayControllers)));
