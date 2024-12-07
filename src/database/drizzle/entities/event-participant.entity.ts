import { boolean, uuid, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { EventParticipantsHasEvent } from "./event-participants-has-event.entity.js";
import Schema from "./calendarSchema.js";

// Event participant table
export const EventParticipant = Schema.table("event-participant", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email"),
    isOrganizer: boolean("is_organizer").default(false),
});

// Event participant relations
export const EventParticipantRelations = relations(EventParticipant, ({ many }) => ({
    events: many(EventParticipantsHasEvent),
}));
