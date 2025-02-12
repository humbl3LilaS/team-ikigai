"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { orders } from "@/database/schema";

export const getOrdersByUserId = async (userId: string) => {
    try {
        const res = await db
            .select()
            .from(orders)
            .where(eq(orders.userId, userId));
        if (!res) {
            return undefined;
        }
        return res;
    } catch {
        return undefined;
    }
};
