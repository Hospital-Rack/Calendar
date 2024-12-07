import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { EventParticipantsHasEvent } from "./event-participants-has-event.entity.js";

@Entity({ schema: "calendar", name: "event-participant" })
export class EventParticipant {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ nullable: true })
    email?: string;

    @Column({
        default: false,
    })
    isOrganizer?: boolean;

    @OneToMany(() => EventParticipantsHasEvent, p => p.participant)
    events!: Relation<EventParticipantsHasEvent[]>;
}
