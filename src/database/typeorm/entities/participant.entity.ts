import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation} from "typeorm";

export class AbstractParticipant {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({nullable: true})
    email?: string;

    @Column({
        default: false,
    })
    isOrganizer?: boolean;

}

