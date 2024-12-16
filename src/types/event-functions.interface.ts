import { AbstractEvent } from "../database/typeorm/index.js";
import { FindManyOptions } from "typeorm";

export type NextAppointmentType<TE> = {
    duration: number;
    extra?: FindManyOptions<TE>;
};

export interface IEventFunctions<TE extends AbstractEvent> {
    getEvents(opts?: FindManyOptions<TE>): Promise<TE[]>;

    getNextAppointmentSlot(opts: NextAppointmentType<TE>): Promise<string | null>;
}
