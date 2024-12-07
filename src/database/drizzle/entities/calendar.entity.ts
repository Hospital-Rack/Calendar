import { text, uuid } from "drizzle-orm/pg-core";
import { Event } from "./event.entity.js";
import { relations } from "drizzle-orm";
import Schema from "./calendarSchema.js";

// Calendar table
export const Calendar = Schema.table("calendar", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    color: text("color"),
});

// Calendar relations
export const CalendarRelations = relations(Calendar, ({ many }) => ({
    events: many(Event),
}));
