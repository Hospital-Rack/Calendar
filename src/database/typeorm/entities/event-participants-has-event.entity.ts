import { PrimaryColumn } from "typeorm";

export class AbstractParticipantsHasEvent {
    @PrimaryColumn()
    participantId!: string;

    @PrimaryColumn()
    eventId!: string;
}
