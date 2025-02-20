"use server";
import { desc, eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { deliveries, drivers, users } from "@/database/schema";

export const getDeliveries = async (userId?: string) => {
    try {
        const res = await db
            .select({
                id: deliveries.id,
                orderId: deliveries.orderId,
                status: deliveries.deliveryStatus,
                driverId: drivers.id,
                driverName: users.name,
                createdAt: deliveries.createdAt,
                deliveredDate: deliveries.deliveredDate,
            })
            .from(deliveries)
            .innerJoin(drivers, eq(deliveries.driverId, drivers.id))
            .innerJoin(users, eq(drivers.userId, users.id))
            .where(userId ? eq(users.id, userId) : undefined)
            .orderBy(desc(deliveries.createdAt));
        if (!res) {
            return undefined;
        }
        return res;
    } catch {
        return undefined;
    }
};

export type TDeliveryInfo = NonNullable<
    Awaited<ReturnType<typeof getDeliveries>>
>[number];
