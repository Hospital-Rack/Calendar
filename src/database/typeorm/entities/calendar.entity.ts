import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { getEventEntity } from "./event.entity.js";

export type CalendarEntityOptions = {
    name?: string;
    schema?: string;

    tEvent: () => ReturnType<typeof getEventEntity>;
};

export function getCalendarEntity(options: CalendarEntityOptions) {
    options.name ??= "calendar";
    options.schema ??= "calendar";

    @Entity({ schema: options.schema, name: options.name })
    class Calendar {
        @PrimaryGeneratedColumn("uuid")
        id!: string;

        @Column()
        name!: string;

        @Column({ nullable: true })
        color?: string;

        @OneToMany(() => options.tEvent(), event => event.calendar)
        events!: Relation<InstanceType<ReturnType<typeof options.tEvent>>[]>;
    }

    return Calendar;
}
