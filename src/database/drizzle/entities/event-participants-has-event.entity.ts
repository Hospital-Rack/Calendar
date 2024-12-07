import { primaryKey, uuid } from "drizzle-orm/pg-core";
import { EventParticipant } from "./event-participant.entity.js";
import { Event } from "./event.entity.js";
import { relations } from "drizzle-orm";
import Schema from "./calendarSchema.js";

export const EventParticipantsHasEvent = Schema.table(
    "event-participants-has-event",
    {
        participantId: uuid("participant_id").references(() => EventParticipant.id, { onDelete: "cascade" }),
        eventId: uuid("event_id").references(() => Event.id, { onDelete: "cascade" }),
    },
    table => {
        return {
            pk: primaryKey({ columns: [table.participantId, table.eventId] }),
        };
    },
);

// Junction table relations
export const EventParticipantsHasEventRelations = relations(EventParticipantsHasEvent, ({ one }) => ({
    event: one(Event, {
        fields: [EventParticipantsHasEvent.eventId],
        references: [Event.id],
    }),
    participant: one(EventParticipant, {
        fields: [EventParticipantsHasEvent.participantId],
        references: [EventParticipant.id],
    }),
}));
