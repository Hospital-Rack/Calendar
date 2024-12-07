import { pgSchema } from "drizzle-orm/pg-core";

function getSchema() {
    return pgSchema("calendar");
}

const Schema = getSchema();
export default Schema;
