import { db } from '../models/index';
import { ApplicationController } from './application.controller';

class SubjectController extends ApplicationController {
    constructor() {
        super(db.SubjectSchema);
    }
}
export const SubjectControllers = new SubjectController();

