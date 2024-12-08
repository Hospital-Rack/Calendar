import "reflect-metadata";
import {
    AbstractCalendar, AbstractEvent, AbstractParticipant, AbstractParticipantsHasEvent,
} from "./database/typeorm/index.js";
import { Entity, JoinColumn, ManyToOne, OneToMany, Relation } from "typeorm";


export * from "./database/typeorm/index.js"
type EntityOptions = {
    calendar: typeof AbstractCalendar;
    event: typeof AbstractEvent;
    participant: typeof AbstractParticipant;
    participantHasEvent: typeof AbstractParticipantsHasEvent;
};

export type CalendarOptions = {
    entities?: Partial<EntityOptions>;
};

export class Calendar {
    private options?: CalendarOptions;
    public declare entities: EntityOptions;
    private static _instance: Calendar;

    public static get(): Calendar {
        if (!Calendar._instance) {
            Calendar._instance = new Calendar();
        }
        return Calendar._instance;
    }

    private constructor() {

    }

    public init(options?: CalendarOptions) {
        this.options = options;
        this.entities = this.constructEntities()
    }

    private constructEntities() {
        const eCalendar = this.options?.entities?.calendar ?? AbstractCalendar;
        const eEvent = this.options?.entities?.event  ?? AbstractEvent;
        const eParticipant = this.options?.entities?.participant ?? AbstractParticipant;
        const eParticipantHasEvent = this.options?.entities?.participantHasEvent ?? AbstractParticipantsHasEvent;

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
            participantHasEvent: ParticipantHasEvent,
        }

    }
}
