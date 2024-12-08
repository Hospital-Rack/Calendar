import "reflect-metadata";
import { getCalendarEntity, getEventEntity, getParticipantEntity, getParticipantHasEventEntity } from "./database/typeorm/index.js";

type EntityOptions = {
    calendar?: ReturnType<typeof getCalendarEntity>;
    event?: ReturnType<typeof getEventEntity>;
    participant?: ReturnType<typeof getParticipantEntity>;
    participantHasEvent?: ReturnType<typeof getParticipantHasEventEntity>;
};

export type CalendarOptions = {
    entities?: EntityOptions;
};

export class Calendar {
    private options?: CalendarOptions;

    public get entities() {
        return this.constructEntities();
    }

    public init(options?: CalendarOptions) {
        this.options = options;
    }

    private constructEntities() {
        let eCalendar: ReturnType<typeof getCalendarEntity>;
        let eEvent: ReturnType<typeof getEventEntity>;
        let eEventParticipant: ReturnType<typeof getParticipantEntity>;
        let eParticipantHasEvent: ReturnType<typeof getParticipantHasEventEntity>;

        if (this.options?.entities?.calendar) eCalendar = this.options.entities.calendar;
        else eCalendar = getCalendarEntity({ tEvent: () => eEvent });

        if (this.options?.entities?.event) eEvent = this.options.entities.event;
        else eEvent = getEventEntity({ tCalendar: () => eCalendar, tParticipantHasEvent: () => eParticipantHasEvent });

        if (this.options?.entities?.participant) eEventParticipant = this.options.entities.participant;
        else eEventParticipant = getParticipantEntity({ tParticipantHasEvent: () => eParticipantHasEvent });

        if (this.options?.entities?.participantHasEvent) eParticipantHasEvent = this.options.entities.participantHasEvent;
        else eParticipantHasEvent = getParticipantHasEventEntity({ tEvent: () => eEvent, tEventParticipant: () => eEventParticipant });

        return {
            calendar: eCalendar,
            event: eEvent,
            eventHasParticipant: eEventParticipant,
            eventParticipantHasEvent: eParticipantHasEvent,
        };
    }
}
