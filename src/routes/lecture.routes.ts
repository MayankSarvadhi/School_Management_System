import express from 'express';
import { asyncWrapper } from '../middleware';
import { LectureValidation } from '../validation/allComman.Validation';
import { LectureControllers } from '../controller';
export const LectureRoutes = express.Router();

LectureRoutes.post('/', LectureValidation, asyncWrapper(LectureControllers.assignLectureSchedule));
LectureRoutes.delete('/:id', asyncWrapper(LectureControllers.delete.bind(LectureControllers)));
LectureRoutes.put('/:id', LectureValidation, asyncWrapper(LectureControllers.update.bind(LectureControllers)));
LectureRoutes.get('/', asyncWrapper(LectureControllers.getData.bind(LectureControllers)));