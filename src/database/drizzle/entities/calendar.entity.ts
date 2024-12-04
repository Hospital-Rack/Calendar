import { text, uuid} from "drizzle-orm/pg-core";
import {event} from "./event.entity";
import {relations} from "drizzle-orm";
import schema from "./calendarSchema";

// Calendar table
export const calendar = schema.table('calendar', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    color: text('color'),
});

// Calendar relations
export const calendarRelations = relations(calendar, ({ many }) => ({
    events: many(event),
}));