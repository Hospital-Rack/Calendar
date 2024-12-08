import { Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import { getEventEntity } from "./event.entity.js";
import { getParticipantEntity } from "./participant.entity.js";

export type ParticipantHasEventEntityOptions = {
    name?: string;
    schema?: string;

    // tEvent: () => ReturnType<typeof getEventEntity>;
    // tEventParticipant: () => ReturnType<typeof getParticipantEntity>;
};

export function getParticipantHasEventEntity(options: ParticipantHasEventEntityOptions) {
    options.name ??= "participant-has-event";
    options.schema ??= "calendar";

    // const tEvent = options.tEvent();
    // const tEventParticipant = options.tEventParticipant();

    // @Entity({ schema: options.schema, name: options.name })
    class ParticipantsHasEvent {
        @PrimaryColumn()
        participantId!: string;

        @PrimaryColumn()
        eventId!: string;

        // @ManyToOne(() => tEvent, event => event.participants, {
        //     onDelete: "CASCADE",
        // })
        // @JoinColumn()
        // event!: Relation<InstanceType<typeof tEvent>>;
        //
        // @ManyToOne(() => tEventParticipant, p => p.events, { onDelete: "CASCADE" })
        // @JoinColumn()
        // participant!: Relation<InstanceType<typeof tEventParticipant>>;
    }

    return ParticipantsHasEvent;
}
