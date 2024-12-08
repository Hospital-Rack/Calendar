import { DataSource, EntityTarget, FindManyOptions, FindOneOptions } from "typeorm";
import { AbstractCalendar } from "../entities/calendar.entity.js";
import { ICalendarFunctions } from "../../../types/calendar-functions.interface.js";


export class TypeormCalendarFunctions<TC extends AbstractCalendar> implements ICalendarFunctions<TC> {
    constructor(
        private readonly datasource: DataSource,
        private readonly entityClass: EntityTarget<TC>,
    ) {}

    getCalendars(opts?: FindManyOptions<TC>): Promise<TC[]> {
        return this.datasource.manager.find<TC>(this.entityClass, opts);
    }

    getCalendar(opts: FindOneOptions<TC>): Promise<TC | null> {
        return this.datasource.manager.findOne<TC>(this.entityClass, opts);
    }
}
