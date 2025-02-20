"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import {
    complains,
    deliveries,
    invoices,
    orderItems,
    orders,
} from "@/database/schema";
import { updateStock } from "@/features/client/cart/actions/update-stock";

export type ExchangeFaultyProductPayload = {
    driverId: string;
    invoiceId: string;
    faultQty: number;
    productId: string;
    userId: string;
    city: string;
    region: string;
    address: string;
    contactNumber: string;
    complainId: string;
};
export const exchangeFaultyProduct = async (
    payload: ExchangeFaultyProductPayload,
) => {
    const updatedInvoice = await db
        .update(invoices)
        .set({
            status: "FAILED",
        })
        .where(eq(invoices.id, payload.invoiceId))
        .returning();
    if (!updatedInvoice) {
        throw new Error("Updating Invoice failed");
    }

    const { success } = await updateStock(payload.productId, payload.faultQty);
    if (!success) {
        throw new Error("Updating Inventory failed");
    }
    const [newOrder] = await db
        .insert(orders)
        .values({
            userId: payload.userId,
            status: "ON_THE_WAY",
            city: payload.city,
            address: payload.address,
            contactNumber: payload.contactNumber,
            region: payload.region,
        })
        .returning();

    if (!newOrder) {
        throw new Error("Failed");
    }

    const [newOrderItem] = await db
        .insert(orderItems)
        .values({
            orderId: newOrder.id,
            productId: payload.productId,
            quantity: payload.faultQty,
        })
        .returning();

    if (!newOrderItem) {
        throw new Error("Failed");
    }

    const [newDelivery] = await db
        .insert(deliveries)
        .values({
            orderId: newOrder.id,
            driverId: payload.driverId,
            type: "EXCHANGE",
        })
        .returning();

    if (!newDelivery) {
        throw new Error("Failed");
    }

    const [updatedComplian] = await db
        .update(complains)
        .set({
            status: "SOLVING",
        })
        .where(eq(complains.id, payload.complainId))
        .returning();

    if (!updatedComplian) {
        throw new Error("Failed");
    }
    return updatedComplian;
};
