import { AbstractCalendar } from "../database/typeorm/index.js";
import { FindManyOptions, FindOneOptions } from "typeorm";


export interface ICalendarFunctions<TC extends AbstractCalendar> {
    getCalendars(opts?: FindManyOptions<TC>): Promise<TC[]>;

    getCalendar(opts: FindOneOptions<TC>): Promise<TC | null>;
}
