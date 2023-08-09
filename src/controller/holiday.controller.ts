import { db } from '../models/index';
import { ApplicationController } from './application.controller';

class HoliDayController extends ApplicationController {
    constructor() {
        super(db.HoliDaySchema);
    }
}
export const HoliDayControllers = new HoliDayController();

