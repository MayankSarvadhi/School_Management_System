import { db } from '../models/index';
import { ApplicationController } from './application.controller';

class ReportingController extends ApplicationController {
    constructor() {
        super(db.ReportingSchema);
    }
}
export const ReportingControllers = new ReportingController();
