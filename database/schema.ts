import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const test = pgTable("test", {
    id: uuid("test").notNull().primaryKey().defaultRandom().unique(),
    name: text("name"),
});
