"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import {
    drivers,
    users,
    deliveries
} from "@/database/schema";

export const getDriverDetailsById = async (id: string) => {
    try {
        const userInfo = await db
            .select({
                name: users.name,
                driverId: drivers.id,
                vehiclePlateNumber: drivers.vehiclePlateNumber,
                deliveryRoute: drivers.deliveryRoute,
            })
            .from(drivers)
            .innerJoin(users, eq(users.id, drivers.userId))
            .where(eq(drivers.id, id));
        if (!userInfo) {
            return undefined;
        }
        const deliveriesData = await db
            .select({
                id: deliveries.id,
                orderId: deliveries.orderId,
                createdAt: deliveries.createdAt,
                deliveredDate: deliveries.deliveredDate,
                deliveryStatus: deliveries.deliveryStatus,
            })
            .from(deliveries)
            .innerJoin(drivers, eq(drivers.id, deliveries.driverId))
            .where(eq(deliveries.driverId, id));
        return {
            user: userInfo,
            deliveries: deliveriesData,
        };
    } catch {
        return undefined;
    }
};
