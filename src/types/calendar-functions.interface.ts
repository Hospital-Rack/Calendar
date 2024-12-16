import { AbstractCalendar } from "../database/typeorm/index.js";
import { FindManyOptions } from "typeorm";

export interface ICalendarFunctions<TC extends AbstractCalendar> {
    getCalendars(opts?: FindManyOptions<TC>): Promise<TC[]>;
}
