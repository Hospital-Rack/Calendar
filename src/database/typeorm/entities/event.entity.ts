import { Column, PrimaryGeneratedColumn } from "typeorm";
import { TRRule } from "../../../types/rrule.type.js";
import { TNotification } from "../../../types/TNotification.type.js";

export class AbstractEvent {
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
}
