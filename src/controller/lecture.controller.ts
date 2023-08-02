import { db } from '../models/index';
import { ApplicationController } from './application.controller';

class LectureController extends ApplicationController {
    constructor() {
        super(db.LectureSchema);
    }
}
export const LectureControllers = new LectureController();

