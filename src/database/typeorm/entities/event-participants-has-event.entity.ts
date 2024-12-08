import {Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation} from "typeorm";

export class AbstractParticipantsHasEvent {
    @PrimaryColumn()
    participantId!: string;

    @PrimaryColumn()
    eventId!: string;
}
