import express from 'express';
import { asyncWrapper } from '../middleware';
import { StudentControllers } from '../controller';
export const StudentsRoutes = express.Router();

StudentsRoutes.post('/', asyncWrapper(StudentControllers.create.bind(StudentControllers)));
StudentsRoutes.delete('/:id', asyncWrapper(StudentControllers.removeStudentsFromClass));
StudentsRoutes.get('/:ClassId', asyncWrapper(StudentControllers.getParticularStudents));
StudentsRoutes.put('/:id', asyncWrapper(StudentControllers.update.bind(StudentControllers)));

