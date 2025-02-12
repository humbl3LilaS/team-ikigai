"use server";

import { and, eq, sql } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { orders, users } from "@/database/schema";

export const getUserTotalSpending = async (id: string) => {
    try {
        const [res] = await db
            .select({
                totalSpending: sql<string>`SUM(${orders.totalAmount})`,
            })
            .from(users)
            .innerJoin(orders, eq(users.id, orders.userId))
            .groupBy(users.id)
            .where(and(eq(users.id, id), eq(orders.status, "FINISH")));
        if (!res) {
            return undefined;
        }
        return { totalSpending: parseInt(res.totalSpending) };
    } catch {
        return undefined;
    }
};
