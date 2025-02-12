"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { invoices, orders, users } from "@/database/schema";

export const getInvoices = async () => {
    try {
        const res = await db
            .select({
                id: invoices.id,
                username: users.name,
                totalAmount: orders.totalAmount,
                paymentMethod: invoices.paymentMethod,
                orderId: orders.id,
                userId: users.id,
            })
            .from(invoices)
            .innerJoin(orders, eq(invoices.orderId, orders.id))
            .innerJoin(users, eq(orders.userId, users.id));
        if (!res) {
            return undefined;
        }
        return res;
    } catch {
        return undefined;
    }
};

export type TInvoiceInfo = NonNullable<
    Awaited<ReturnType<typeof getInvoices>>
>[number];
