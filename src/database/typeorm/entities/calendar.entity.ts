import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Event } from "./event.entity.js";

@Entity({ schema: "calendar", name: "calendar" })
export class Calendar {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column({ nullable: true })
    color?: string;

    @OneToMany(() => Event, event => event.calendar)
    events!: Relation<Event[]>;
}
