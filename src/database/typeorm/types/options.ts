import { AbstractCalendar } from "../entities/calendar.entity.js";
import { AbstractEvent } from "../entities/event.entity.js";
import { AbstractParticipant } from "../entities/participant.entity.js";
import { AbstractParticipantsHasEvent } from "../entities/event-participants-has-event.entity.js";
import { DataSource } from "typeorm";

export type TypeOrmEntityOptions = {
    calendar: typeof AbstractCalendar;
    event: typeof AbstractEvent;
    participant: typeof AbstractParticipant;
    participantHasEvent: typeof AbstractParticipantsHasEvent;
};

export type TypeOrmOptions = {
    orm: "typeorm";
    datasource: () => DataSource;
    entities?: Partial<TypeOrmEntityOptions>;
};
