import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { getParticipantHasEventEntity } from "./event-participants-has-event.entity.js";

export type ParticipantEntityOptions = {
    name?: string;
    schema?: string;

    tParticipantHasEvent: () => ReturnType<typeof getParticipantHasEventEntity>;
};

export function getParticipantEntity(options: ParticipantEntityOptions) {
    options.name ??= "participant";
    options.schema ??= "calendar";

    const tParticipantHasEvent = options.tParticipantHasEvent();

    @Entity({ schema: options.schema, name: options.name })
    class Participant {
        @PrimaryGeneratedColumn("uuid")
        id!: string;

        @Column({ nullable: true })
        email?: string;

        @Column({
            default: false,
        })
        isOrganizer?: boolean;

        @OneToMany(() => tParticipantHasEvent, p => p.participant)
        events!: Relation<InstanceType<typeof tParticipantHasEvent>[]>;
    }

    return Participant;
}
