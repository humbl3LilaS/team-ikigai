"use server";
import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { deliveries, drivers, users } from "@/database/schema";

export const getDeliveries = async () => {
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
            .innerJoin(users, eq(drivers.userId, users.id));
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
