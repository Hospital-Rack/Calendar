import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
} from "typeorm";
import { TRRule } from "../../../types/rrule.type";
import { Calendar } from "./calendar.entity";
import { EventParticipantsHasEvent } from "./event-participants-has-event.entity";
import {TNotification} from "../../../types/TNotification.type";

@Entity({ schema: "calendar", name:"event" })
export class Event {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({
        nullable: true,
    })
    calendarId?: string;

    @Column({ nullable: true })
    name?: string;

    @Column({
        nullable: true,
        type: "text",
    })
    description?: string;

    @Column({
        nullable: true,
    })
    location?: string;

    @Column({
        nullable: true,
    })
    duration?: number;

    @Column({
        type: "jsonb",
        nullable: true,
        default: {},
    })
    rrule!: Partial<TRRule>;

    @Column({
        type: "jsonb",
        nullable: true,
        default: [],
    })
    notifications!: Partial<TNotification[]>;

    @ManyToOne(() => Calendar, cal => cal.events, { onDelete: "CASCADE" })
    @JoinColumn()
    calendar!: Relation<Calendar>;

    @OneToMany(() => EventParticipantsHasEvent, p => p.event)
    participants!: Relation<EventParticipantsHasEvent[]>;
}
