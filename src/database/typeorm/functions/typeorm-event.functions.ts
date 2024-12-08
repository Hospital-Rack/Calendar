import { IEventFunctions } from "../../../types/event-functions.interface.js";
import { AbstractEvent } from "../entities/event.entity.js";
import { DataSource, EntityTarget, FindManyOptions, FindOneOptions } from "typeorm";

export class TypeormEventFunctions<TE extends AbstractEvent> implements IEventFunctions<TE> {
    constructor(
        private readonly datasource: DataSource,
        private readonly entityClass: EntityTarget<TE>,
    ) {}

    getEvents(opts?: FindManyOptions<TE>): Promise<TE[]> {
        return this.datasource.manager.find<TE>(this.entityClass, opts);
    }

    getEvent(opts: FindOneOptions<TE>): Promise<TE | null> {
        return this.datasource.manager.findOne<TE>(this.entityClass, opts);
    }
}
