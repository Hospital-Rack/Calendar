import { AbstractEvent } from "../database/typeorm/index.js";
import { FindManyOptions, QueryBuilder } from "typeorm";

export interface IEventFunctions<TE extends AbstractEvent> {
    getNextAppointmentSlot(duration: number, builder?: (qb: QueryBuilder<TE>) => void): Promise<string | null>;

    getEvents(startDate: Date, endDate: Date, opts: FindManyOptions<TE>): Promise<TE[]>;
}
