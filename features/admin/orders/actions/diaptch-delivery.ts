"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { deliveries, orders } from "@/database/schema";

export const dispatchDelivery = async ({
    driver,
    orderId,
}: {
    driver: string;
    orderId: string;
}) => {
    try {
        const update = await db
            .update(orders)
            .set({
                status: "ON_THE_WAY",
            })
            .where(eq(orders.id, orderId))
            .returning();
        if (!update) {
            return undefined;
        }
        const res = await db
            .insert(deliveries)
            .values({
                orderId,
                driverId: driver,
            })
            .returning();
        if (!res) {
            return undefined;
        }
        return res;
    } catch {
        return undefined;
    }
};
