import { AbstractEvent } from "../database/typeorm/index.js";
import { FindManyOptions, FindOneOptions } from "typeorm";

export interface IEventFunctions<TE extends AbstractEvent> {
    getEvents(opts?: FindManyOptions<TE>): Promise<TE[]>;

    getEvent(opts: FindOneOptions<TE>): Promise<TE | null>;
}
