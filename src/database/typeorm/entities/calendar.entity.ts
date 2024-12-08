import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type CalendarEntityOptions = {
    name?: string;
    schema?: string;

    // tEvent: () => ReturnType<typeof getEventEntity>;
};

export function getCalendarEntity(options: CalendarEntityOptions) {
    options.name ??= "calendar";
    options.schema ??= "calendar";

    // const tEvent = options.tEvent();

    // @Entity({ schema: options.schema, name: options.name })
    class Calendar {
        @PrimaryGeneratedColumn("uuid")
        id!: string;

        @Column()
        name!: string;

        @Column({ nullable: true })
        color?: string;

        // @OneToMany(() => tEvent, event => event.calendar)
        // events!: Relation<InstanceType<typeof tEvent>[]>;
    }

    return Calendar;
}
