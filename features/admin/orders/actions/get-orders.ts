"use server";

import { desc, eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { IOrderStatus, orders, users } from "@/database/schema";

export const getOrders = async (status?: IOrderStatus) => {
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
            .innerJoin(users, eq(orders.userId, users.id))
            .where(status ? eq(orders.status, status) : undefined)
            .orderBy(desc(orders.createdAt), desc(orders.totalAmount));
        if (!res) {
            return undefined;
        }
        return res || [];
    } catch {
        return undefined;
    }
};

export type TOrderInfo = NonNullable<
    Awaited<ReturnType<typeof getOrders>>
>[number];
