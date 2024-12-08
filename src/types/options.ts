import { TypeOrmOptions } from "../database/typeorm/types/options.js";
import { DrizzleOptions } from "../database/drizzle/types/options.js";

export type CalendarOptions = (TypeOrmOptions | DrizzleOptions) & {
    schema?: string;
    orm: "typeorm" | "drizzle";
};
