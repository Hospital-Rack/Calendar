import "reflect-metadata";
import { AbstractCalendar, AbstractEvent } from "./database/typeorm/index.js";
import { FindManyOptions } from "typeorm";
import { IEventFunctions, NextAppointmentType } from "./types/event-functions.interface.js";
import { ICalendarFunctions } from "./types/calendar-functions.interface.js";
import { TypeormEventFunctions } from "./database/typeorm/functions/typeorm-event.functions.js";
import { TypeormCalendarFunctions } from "./database/typeorm/functions/typeorm-calendar.functions.js";
import { CalendarOptions } from "./types/options.js";
import { constructTypeOrmEntities, TypeOrmEntities } from "./database/typeorm/constructTypeOrmEntities.js";

export class Calendar implements ICalendarFunctions<any>, IEventFunctions<any> {
    private static _instance: Calendar;
    declare private options: CalendarOptions;

    declare public typeOrmEntities: TypeOrmEntities;

    private constructor() {}

    public get entities() {
        if (this.options.orm === "typeorm") {
            return this.typeOrmEntities;
        }

        throw new Error("Method not implemented.");
    }

    public static get(): Calendar {
        if (!Calendar._instance) {
            Calendar._instance = new Calendar();
        }
        return Calendar._instance;
    }

    public init(options: CalendarOptions) {
        options.schema ??= "calendar";

        this.options = options;

        if (this.options.orm === "typeorm") {
            this.typeOrmEntities = constructTypeOrmEntities(this.options);
        } else {
            throw new Error("Orm not implemented.");
        }
    }

    getEvents<TE extends AbstractEvent>(opts?: FindManyOptions<TE>): Promise<TE[]> {
        if (this.options.orm === "typeorm") {
            return new TypeormEventFunctions<TE>(this.options.datasource(), this.typeOrmEntities.event).getEvents(opts);
        }

        throw new Error("Method not implemented.");
    }

    getCalendars<TC extends AbstractCalendar>(opts?: FindManyOptions<TC>): Promise<TC[]> {
        if (this.options.orm === "typeorm") {
            return new TypeormCalendarFunctions<TC>(this.options.datasource(), this.typeOrmEntities.calendar).getCalendars(opts);
        }

        throw new Error("Method not implemented.");
    }

    getNextAppointmentSlot<TE extends AbstractEvent>(opts: NextAppointmentType<TE>): Promise<string | null> {
        if (this.options.orm === "typeorm") {
            return new TypeormEventFunctions<TE>(this.options.datasource(), this.typeOrmEntities.event).getNextAppointmentSlot(opts);
        }

        throw new Error("Method not implemented.");
    }
}
