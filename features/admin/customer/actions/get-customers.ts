"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { users } from "@/database/schema";

export const getCustomers = async () => {
    try {
        const customers = await db
            .select()
            .from(users)
            .where(eq(users.role, "USER"));
        if (!customers) {
            return undefined;
        }
        return customers;
    } catch {
        return undefined;
    }
};

export type TCustomerInfo = NonNullable<
    Awaited<ReturnType<typeof getCustomers>>
>[number];
