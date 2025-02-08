import { pgEnum, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);

export const users = pgTable("users", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    name: varchar("name", { length: 200 }).notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    role: ROLE_ENUM("role").default("USER").notNull(),
});

export type UserRole = (typeof ROLE_ENUM.enumValues)[number];
