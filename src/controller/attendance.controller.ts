import { db } from '../models/index';
import { ApplicationController } from './application.controller';

class AttendanceController extends ApplicationController {
    constructor() {
        super(db.AttendanceSchema);
    }
}
export const AttendanceControllers = new AttendanceController();

