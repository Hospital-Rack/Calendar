import {boolean, uuid, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {eventParticipantsHasEvent} from "./event-participants-has-event.entity";
import schema from "./calendarSchema";

// Event participant table
export const eventParticipant = schema.table('event-participant', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email'),
    isOrganizer: boolean('is_organizer').default(false),
});

// Event participant relations
export const eventParticipantRelations = relations(eventParticipant, ({ many }) => ({
    events: many(eventParticipantsHasEvent),
}));