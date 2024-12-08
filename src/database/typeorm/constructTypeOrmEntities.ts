import { CalendarOptions } from "../../types/options.js";
import { AbstractCalendar } from "./entities/calendar.entity.js";
import { AbstractEvent } from "./entities/event.entity.js";
import { AbstractParticipant } from "./entities/participant.entity.js";
import { AbstractParticipantsHasEvent } from "./entities/event-participants-has-event.entity.js";
import { Entity, JoinColumn, ManyToOne, OneToMany, Relation } from "typeorm";

export type TypeOrmEntities = {
    calendar: ReturnType<typeof constructTypeOrmEntities>["calendar"];
    event: ReturnType<typeof constructTypeOrmEntities>["event"];
    participant: ReturnType<typeof constructTypeOrmEntities>["participant"];
    participantHasEvent: ReturnType<typeof constructTypeOrmEntities>["participantHasEvent"];
};

export function constructTypeOrmEntities(options: CalendarOptions) {
    if (options.orm !== "typeorm") throw new Error("only for typeorm");

    const aCalendar = options.entities?.calendar ?? AbstractCalendar;
    const aEvent = options.entities?.event ?? AbstractEvent;
    const aParticipant = options.entities?.participant ?? AbstractParticipant;
    const aParticipantHasEvent = options.entities?.participantHasEvent ?? AbstractParticipantsHasEvent;

    @Entity({ schema: options.schema, name: "calendar" })
    class Calendar extends aCalendar {
        @OneToMany(() => Event, event => event.calendar)
        events!: Relation<Event[]>;
    }

    @Entity({ schema: options.schema, name: "event" })
    class Event extends aEvent {
        @ManyToOne(() => Calendar, cal => cal.events, { onDelete: "CASCADE" })
        @JoinColumn()
        calendar!: Relation<Calendar>;

        @OneToMany(() => ParticipantHasEvent, p => p.event)
        participants!: Relation<ParticipantHasEvent[]>;
    }

    @Entity({ schema: options.schema, name: "participant" })
    class Participant extends aParticipant {
        @OneToMany(() => ParticipantHasEvent, p => p.participant)
        events!: Relation<ParticipantHasEvent[]>;
    }

    @Entity({ schema: options.schema, name: "participant-has-event" })
    class ParticipantHasEvent extends aParticipantHasEvent {
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
    };
}
