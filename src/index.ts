import "reflect-metadata";
import { getCalendarEntity, getEventEntity, getParticipantEntity, getParticipantHasEventEntity } from "./database/typeorm/index.js";
import { Entity, JoinColumn, ManyToOne, OneToMany, Relation } from "typeorm";

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
        const eCalendar = this.options?.entities?.calendar ? this.options.entities.calendar : getCalendarEntity({});
        const eEvent = this.options?.entities?.event ? this.options.entities.event : getEventEntity({});
        const eParticipant = this.options?.entities?.participant ? this.options.entities.participant : getParticipantEntity({});
        const eParticipantHasEvent = this.options?.entities?.participantHasEvent ? this.options.entities.participantHasEvent : getParticipantHasEventEntity({});

        @Entity({ schema: "calendar", name: "calendar" })
        class Calendar extends eCalendar {
            @OneToMany(() => Event, event => event.calendar)
            events!: Relation<Event[]>;
        }

        @Entity({ schema: "calendar", name: "event" })
        class Event extends eEvent {
            @ManyToOne(() => Calendar, cal => cal.events, { onDelete: "CASCADE" })
            @JoinColumn()
            calendar!: Relation<Calendar>;

            @OneToMany(() => ParticipantHasEvent, p => p.event)
            participants!: Relation<ParticipantHasEvent[]>;
        }

        @Entity({ schema: "calendar", name: "participant" })
        class Participant extends eParticipant {
            @OneToMany(() => ParticipantHasEvent, p => p.participant)
            events!: Relation<ParticipantHasEvent[]>;
        }

        @Entity({ schema: "calendar", name: "participant-has-event" })
        class ParticipantHasEvent extends eParticipantHasEvent {
            @ManyToOne(() => Event, event => event.participants, {
                onDelete: "CASCADE",
            })
            @JoinColumn()
            event!: Relation<Event>;

            @ManyToOne(() => Participant, p => p.events, { onDelete: "CASCADE" })
            @JoinColumn()
            participant!: Relation<Participant>;
        }

        return {
            calendar: Calendar,
            event: Event,
            participant: Participant,
            eventParticipantHasEvent: ParticipantHasEvent,
        };
    }
}
