"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { drivers, users } from "@/database/schema";

export const getDrivers = async () => {
    try {
        const res = await db
            .select({
                id: drivers.id,
                name: users.name,
                deliveryRoute: drivers.deliveryRoute,
                orderLimit: drivers.orderLimit,
                vehiclePlateNumber: drivers.vehiclePlateNumber,
            })
            .from(drivers)
            .innerJoin(users, eq(drivers.userId, users.id));
        if (!res) {
            return undefined;
        }
        return res;
    } catch {
        return undefined;
    }
};

export type TDriverInfo = NonNullable<
    Awaited<ReturnType<typeof getDrivers>>
>[number];
