import { IEventFunctions, NextAppointmentType } from "../../../types/event-functions.interface.js";
import { AbstractEvent } from "../entities/event.entity.js";
import { DataSource, EntityTarget, FindManyOptions, FindOneOptions, Raw } from "typeorm";

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

    async getNextAppointmentSlot(opts: NextAppointmentType<TE>): Promise<string | null> {
        const now = new Date();
        const events = await this.datasource.manager.createQueryBuilder<TE>(this.entityClass, "event")
            .where(`(event.rrule->>'startDate')::timestamp >= :now`, { now })
            .getMany();

        // Sort events by start date
        events.sort((a, b) => {
            const startA = new Date(a.rrule.startDate!);
            const startB = new Date(b.rrule.startDate!);
            return startA.getTime() - startB.getTime();
        });

        let nextAvailableSlot: Date | null;

        for (let i = 0; i < events.length; i++) {
            const eventStart = new Date(events[i].rrule.startDate!);

            // If this is the first event, check from now to the start of the first event
            if (i === 0) {
                if (eventStart.getTime() - now.getTime() >= opts.duration * 60000) {
                    nextAvailableSlot = new Date(now.getTime() + opts.duration * 60000);
                    return nextAvailableSlot.toISOString(); // Return the next available slot in ISO format
                }
            } else {
                const previousEventEnd = new Date(new Date(events[i - 1].rrule.startDate!).getTime() + (events[i - 1].duration || 0) * 60000);
                // Check the gap between the previous event and the current event
                if (eventStart.getTime() - previousEventEnd.getTime() >= opts.duration * 60000) {
                    nextAvailableSlot = new Date(previousEventEnd.getTime() + opts.duration * 60000);
                    return nextAvailableSlot.toISOString(); // Return the next available slot in ISO format
                }
            }
        }

        // If no slots were found between events, check after the last event
        if (events.length > 0) {
            const lastEventEnd = new Date(new Date(events[events.length - 1].rrule.startDate!).getTime() + (events[events.length - 1].duration || 0) * 60000);
            nextAvailableSlot = new Date(lastEventEnd.getTime() + opts.duration * 60000);
            return nextAvailableSlot.toISOString(); // Return the next available slot in ISO format
        }

        // If there are no events, return a slot starting from now
        nextAvailableSlot = new Date(now.getTime() + opts.duration * 60000);
        return nextAvailableSlot.toISOString(); // Return the next available slot in ISO format
    }
}
