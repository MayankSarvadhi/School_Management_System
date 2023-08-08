import express from 'express';
import { asyncWrapper } from '../middleware';
import { SubjectControllers } from '../controller';
import { SubjectValidation } from '../validation/allComman.Validation';
export const SubjectsRoutes = express.Router();

SubjectsRoutes.post('/', SubjectValidation, asyncWrapper(SubjectControllers.create.bind(SubjectControllers)));
SubjectsRoutes.get('/', asyncWrapper(SubjectControllers.getData.bind(SubjectControllers)));
SubjectsRoutes.put('/:id', SubjectValidation, asyncWrapper(SubjectControllers.update.bind(SubjectControllers)));
SubjectsRoutes.delete('/:id', asyncWrapper(SubjectControllers.delete.bind(SubjectControllers)));

