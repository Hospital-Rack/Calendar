import { AbstractEvent } from "../database/typeorm/index.js";
import { FindManyOptions, QueryBuilder } from "typeorm";

export type OccurrenceResult<TE extends AbstractEvent> = {
    event: TE,
    nextOccurrence: Date
};

export interface IEventFunctions<TE extends AbstractEvent> {
    getNextAppointmentSlot(duration: number, builder?: (qb: QueryBuilder<TE>) => void): Promise<string | null>;

    getEventOccurrences(startDate: Date, endDate: Date, opts?: FindManyOptions<TE>): Promise<OccurrenceResult<TE>[]>;
}
