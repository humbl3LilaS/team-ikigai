import { pgEnum, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);

export const users = pgTable("users", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    name: varchar("name", { length: 200 }).notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    role: ROLE_ENUM("role").default("USER").notNull(),
    phoneNumber: text("phone_number").notNull(),
    address: text("address"),
    city: text("city"),
    region: text("region"),
});

export type UserRole = (typeof ROLE_ENUM.enumValues)[number];

export const UserInsertSchema = createInsertSchema(users, {
    name: (schema) => schema.min(8),
    email: (schema) => schema.email(),
    password: (schema) =>
        schema
            .min(8, "Password must be at least 8 characters long")
            .regex(
                /[A-Z]/,
                "Password must contain at least one uppercase letter",
            )
            .regex(
                /[a-z]/,
                "Password must contain at least one lowercase letter",
            )
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(
                /[^A-Za-z0-9]/,
                "Password must contain at least one special character",
            ),
    phoneNumber: (schema) =>
        schema.regex(
            /^09\d{9}$/,
            "Phone number must start with 09 and have a total length of 11 digits",
        ),
}).omit({
    id: true,
    address: true,
    city: true,
    region: true,
});

export type IUserInsert = Zod.infer<typeof UserInsertSchema>;
