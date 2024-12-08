import { Column, PrimaryGeneratedColumn } from "typeorm";

export class AbstractParticipant {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ nullable: true })
    email?: string;

    @Column({
        default: false,
    })
    isOrganizer?: boolean;
}
