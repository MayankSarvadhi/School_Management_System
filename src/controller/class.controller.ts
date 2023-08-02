import { db } from '../models/index';
import { ApplicationController } from './application.controller';

class ClassController extends ApplicationController {
    constructor() {
        super(db.ClassSchema);
    }
}
export const ClassControllers = new ClassController();

