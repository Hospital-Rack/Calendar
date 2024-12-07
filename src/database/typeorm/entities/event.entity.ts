import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { TRRule } from "../../../types/rrule.type.js";
import { TNotification } from "../../../types/TNotification.type.js";
import { getCalendarEntity } from "./calendar.entity.js";
import { getParticipantHasEventEntity } from "./event-participants-has-event.entity.js";

export type EventEntityOptions = {
    name?: string;
    schema?: string;

    tCalendar: () => ReturnType<typeof getCalendarEntity>;
    tParticipantsHasEvent: () => ReturnType<typeof getParticipantHasEventEntity>;
};

export function getEventEntity(options: EventEntityOptions) {
    options.name ??= "event";
    options.schema ??= "calendar";

    @Entity({ schema: options.schema, name: options.name })
    class Event {
        @PrimaryGeneratedColumn("uuid")
        id!: string;

        @Column()
        calendarId!: string;

        @Column({ nullable: true })
        name?: string;

        @Column({
            nullable: true,
            type: "text",
        })
        description?: string;

        @Column({ nullable: true })
        location?: string;

        @Column({ nullable: true })
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

        @ManyToOne(() => options.tCalendar(), cal => cal.events, { onDelete: "CASCADE" })
        @JoinColumn()
        calendar!: Relation<InstanceType<ReturnType<typeof options.tCalendar>>>;

        @OneToMany(() => options.tParticipantsHasEvent(), p => p.event)
        participants!: Relation<InstanceType<ReturnType<typeof options.tParticipantsHasEvent>>[]>;
    }

    return Event;
}
