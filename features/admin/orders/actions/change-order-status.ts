"use server";
import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { IOrderStatus, orders } from "@/database/schema";

export const changeOrderStatus = async ({
    orderId,
    payload,
}: {
    orderId: string;
    payload: IOrderStatus;
}) => {
    try {
        const [newStatus] = await db
            .update(orders)
            .set({
                status: payload,
            })
            .where(eq(orders.id, orderId))
            .returning();
        if (!newStatus) {
            return undefined;
        }
        return newStatus;
    } catch {
        return undefined;
    }
};
