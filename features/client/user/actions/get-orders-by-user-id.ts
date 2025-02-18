"use server";

import { and, desc, eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { IOrderStatus, orders } from "@/database/schema";

export const getOrdersByUserId = async (
    userId: string,
    status?: IOrderStatus,
) => {
    try {
        const res = await db
            .select()
            .from(orders)
            .where(
                and(
                    status ? eq(orders.status, status) : undefined,
                    eq(orders.userId, userId),
                ),
            )
            .orderBy(desc(orders.createdAt));
        if (!res) {
            return undefined;
        }
        return res;
    } catch {
        return undefined;
    }
};
