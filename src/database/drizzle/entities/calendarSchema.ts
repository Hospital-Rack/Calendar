import { pgSchema } from "drizzle-orm/pg-core";


function getSchema() {
    return pgSchema("calendar");
}

const schema = getSchema();
export default schema;