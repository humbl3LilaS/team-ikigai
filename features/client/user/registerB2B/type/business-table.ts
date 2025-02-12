import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import * as z from "zod";

import { users } from "@/database/schema";

export const businessAccounts = pgTable("business_accounts", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    ownerUserId: uuid("owner_user_id") // The user who registered the business
        .references(() => users.id)
        .notNull(),
    businessName: varchar("business_name", { length: 255 }).notNull(),
    businessSize: varchar("business_size", { length: 50 }).notNull(),
    website: text("website"),
    description: text("description"),
    status: varchar("status", { length: 20 }).default("PENDING"), // PENDING, APPROVED, REJECTED
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 🚀 Business Registration Validation Schema
export const BusinessRegistrationSchema = z.object({
    businessName: z
        .string()
        .min(2, "Business name must be at least 2 characters long"),
    businessSize: z.enum(["Small", "Medium", "Large"], {
        errorMap: () => ({ message: "Select a valid business size" }),
    }),
    region: z.string().min(1, "Region is required"),
    city: z.string().min(1, "City is required"),
    website: z
        .string()
        .optional()
        .refine((url) => !url || url.startsWith("http"), {
            message: "Invalid website URL (must start with http/https)",
        }),
    description: z.string().optional(),
});

// ✅ TypeScript Type for Business Registration
export type BusinessRegistrationType = z.infer<
    typeof BusinessRegistrationSchema
>;
