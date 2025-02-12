"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { orders } from "@/database/schema";

export const getLastOrderByUserId = async (userId: string) => {
    try {
        const [res] = await db
            .select()
            .from(orders)
            .where(eq(orders.userId, userId))
            .orderBy(orders.createdAt)
            .limit(1);
        if (!res) {
            return undefined;
        }

        return res;
    } catch {
        return undefined;
    }
};
