"use server";

import { desc, eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import {
    complains,
    invoices,
    orderItems,
    orders,
    products,
    stocks,
} from "@/database/schema";

export const getComplains = async () => {
    try {
        const res = await db
            .select({
                id: complains.id,
                type: complains.type,
                status: complains.status,
                faultQty: complains.faultQty,
                issues: complains.issues,
                createdAt: complains.createdAt,
                resolvedAt: complains.resolvedAt,
                instockQty: stocks.stock,
                invoiceId: invoices.id,
                productId: products.id,
                userId: orders.userId,
                contactNumber: orders.contactNumber,
                city: orders.city,
                region: orders.region,
                address: orders.address,
            })
            .from(complains)
            .innerJoin(orderItems, eq(complains.orderItemId, orderItems.id))
            .innerJoin(orders, eq(orderItems.orderId, orders.id))
            .innerJoin(invoices, eq(invoices.orderId, orders.id))
            .innerJoin(products, eq(orderItems.productId, products.id))
            .innerJoin(stocks, eq(stocks.productId, products.id))
            .orderBy(desc(complains.createdAt));
        if (!res) {
            return undefined;
        }
        return res;
    } catch {
        return undefined;
    }
};

export type TComplains = NonNullable<
    Awaited<ReturnType<typeof getComplains>>
>[number];
