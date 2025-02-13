"use server";

import { eq } from "drizzle-orm";
import { fillCacheWithNewSubTreeData } from "next/dist/client/components/router-reducer/fill-cache-with-new-subtree-data";

import { db } from "@/database/dirzzle";
import { deliveries, IDelivery, invoices, orders } from "@/database/schema";

export type UpdateDeliveryPayload = {
    deliveryId: string;
    payload: Partial<IDelivery>;
};

export const updateDelivery = async ({
    deliveryId,
    payload,
}: UpdateDeliveryPayload) => {
    try {
        const updateData: Partial<IDelivery> =
            payload.deliveryStatus === "DELIVERED"
                ? {
                      ...payload,
                      deliveredDate: new Date(),
                  }
                : payload;
        const res = await db
            .update(deliveries)
            .set(updateData)
            .where(eq(deliveries.id, deliveryId))
            .returning();
        if (!res) {
            return undefined;
        }

        if (payload.deliveryStatus === "DELIVERED") {
            const [updatedOrder] = await db
                .update(orders)
                .set({ status: "FINISH" })
                .where(eq(orders.id, res[0].orderId))
                .returning();
            if (!updatedOrder) {
                return undefined;
            }
            await db.insert(invoices).values({
                orderId: updatedOrder.id,
            });
            return res;
        }
        return res;
    } catch {
        return undefined;
    }
};
