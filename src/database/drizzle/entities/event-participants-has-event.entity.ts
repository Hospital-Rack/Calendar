import { primaryKey, uuid} from "drizzle-orm/pg-core";
import {eventParticipant} from "./event-participant.entity";
import {event} from "./event.entity";
import {relations} from "drizzle-orm";
import schema from "./calendarSchema";

export const eventParticipantsHasEvent = schema.table('event-participants-has-event', {
    participantId: uuid('participant_id').references(() => eventParticipant.id, { onDelete: 'cascade' }),
    eventId: uuid('event_id').references(() => event.id, { onDelete: 'cascade' }),
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.participantId, table.eventId] }),
    };
});

// Junction table relations
export const eventParticipantsHasEventRelations = relations(eventParticipantsHasEvent, ({ one }) => ({
    event: one(event, {
        fields: [eventParticipantsHasEvent.eventId],
        references: [event.id],
    }),
    participant: one(eventParticipant, {
        fields: [eventParticipantsHasEvent.participantId],
        references: [eventParticipant.id],
    }),
}));