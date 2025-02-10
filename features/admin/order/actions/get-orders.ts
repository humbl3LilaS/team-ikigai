"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { orders, users } from "@/database/schema";

export const getOrders = async () => {
    try {
        const res = await db
            .select({
                id: orders.id,
                username: users.name,
                userId: users.id,
                createdAt: orders.createdAt,
                totalAmount: orders.totalAmount,
                status: orders.status,
                contactNumber: orders.contactNumber,
                region: orders.region,
                city: orders.city,
                address: orders.address,
            })
            .from(orders)
            .innerJoin(users, eq(orders.userId, users.id));
        if (!res) {
            return undefined;
        }
        return res;
    } catch {
        return undefined;
    }
};

export type TOrderInfo = NonNullable<
    Awaited<ReturnType<typeof getOrders>>
>[number];
