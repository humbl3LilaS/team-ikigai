"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import {
    complains,
    orderItems,
    orders,
    productDetails,
    products,
} from "@/database/schema";

export const getComplains = async (useId: string) => {
    try {
        const res = await db
            .select({
                status: complains.status,
                id: complains.id,
                createdAt: complains.createdAt,
                issues: complains.issues,
                productName: productDetails.name,
                qty: orderItems.quantity,
            })
            .from(complains)
            .innerJoin(orderItems, eq(complains.orderItemId, orderItems.id))
            .innerJoin(orders, eq(orderItems.orderId, orders.id))
            .innerJoin(products, eq(orderItems.productId, products.id))
            .innerJoin(productDetails, eq(productDetails.id, products.detailId))
            .where(eq(orders.userId, useId));
        if (!res) {
            return undefined;
        }
        return res;
    } catch {
        return undefined;
    }
};

export type TComplainDetails = NonNullable<
    Awaited<ReturnType<typeof getComplains>>
>[number];
