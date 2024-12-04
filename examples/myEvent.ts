import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation} from "typeorm";
import {Event} from "../src/database/typeorm/entities/event.entity";
import {Calendar} from "../src/database/typeorm/entities/calendar.entity";

@Entity({ schema: "calendar" })
export class MyCalendar extends Calendar {

}