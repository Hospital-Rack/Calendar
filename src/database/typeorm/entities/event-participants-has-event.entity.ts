import {
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    Relation,
} from "typeorm";
import {Event} from "./event.entity";
import {EventParticipant} from "./event-participant.entity";

@Entity({schema: "calendar", name: "event-participants-has-event"})
export class EventParticipantsHasEvent {
    @PrimaryColumn()
    participantId?: string;

    @PrimaryColumn()
    eventId?: string;

    @ManyToOne(() => Event, event => event.participants, {
        onDelete: "CASCADE",
    })
    @JoinColumn()
    event!: Relation<Event>;

    @ManyToOne(() => EventParticipant, p => p.events, {onDelete: "CASCADE"})
    @JoinColumn()
    participant!: Relation<EventParticipant>;
}
