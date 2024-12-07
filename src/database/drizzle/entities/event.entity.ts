import { jsonb, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { Calendar } from "./calendar.entity.js";
import { EventParticipantsHasEvent } from "./event-participants-has-event.entity.js";
import { TRRule } from "../../../types/rrule.type.js";
import { TNotification } from "../../../types/TNotification.type.js";
import Schema from "./calendarSchema.js";

// Event table
export const Event = Schema.table("event", {
    id: uuid("id").primaryKey().defaultRandom(),
    calendarId: uuid("calendar_id")
        .notNull()
        .references(() => Calendar.id, { onDelete: "cascade" }),
    name: text("name"),
    description: text("description"),
    location: text("location"),
    duration: text("duration"),
    rrule: jsonb("rrule").$type<Partial<TRRule>>().default({}),
    notifications: jsonb("notifications").$type<Partial<TNotification>[]>().default([]),
});

// Event relations
export const EventRelations = relations(Event, ({ one, many }) => ({
    calendar: one(Calendar, {
        fields: [Event.calendarId],
        references: [Calendar.id],
    }),
    participants: many(EventParticipantsHasEvent),
}));
