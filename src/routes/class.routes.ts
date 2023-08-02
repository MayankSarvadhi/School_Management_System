import express from 'express';
import { asyncWrapper } from '../middleware';
import { ClassValidation } from '../validation/allComman.Validation';
import { ClassControllers } from '../controller';
export const ClassRoutes = express.Router();

ClassRoutes.post('/', ClassValidation, asyncWrapper(ClassControllers.create.bind(ClassControllers)));
ClassRoutes.delete('/:id', asyncWrapper(ClassControllers.delete.bind(ClassControllers)));
ClassRoutes.put('/:id', asyncWrapper(ClassControllers.update.bind(ClassControllers)));
ClassRoutes.get('/', asyncWrapper(ClassControllers.getData.bind(ClassControllers)));