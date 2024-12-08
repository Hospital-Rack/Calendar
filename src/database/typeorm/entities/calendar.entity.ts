import { Column, PrimaryGeneratedColumn } from "typeorm";

export class AbstractCalendar {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column({ nullable: true })
    color?: string;
}
