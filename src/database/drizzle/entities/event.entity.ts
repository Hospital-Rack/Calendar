import {jsonb, text, uuid} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {calendar} from "./calendar.entity";
import {eventParticipantsHasEvent} from "./event-participants-has-event.entity";
import {TRRule} from "../../../types/rrule.type";
import {TNotification} from "../../../types/TNotification.type";
import schema from "./calendarSchema";
// Event table
export const event = schema.table('event', {
    id: uuid('id').primaryKey().defaultRandom(),
    calendarId: uuid('calendar_id').references(() => calendar.id, { onDelete: 'cascade' }),
    name: text('name'),
    description: text('description'),
    location: text('location'),
    duration: text('duration'),
    rrule: jsonb('rrule').$type<Partial<TRRule>>().default({}),
    notifications: jsonb('notifications').$type<Partial<TNotification>[]>().default([]),
});

// Event relations
export const eventRelations = relations(event, ({ one, many }) => ({
    calendar: one(calendar, {
        fields: [event.calendarId],
        references: [calendar.id],
    }),
    participants: many(eventParticipantsHasEvent),
}));