"use server";
import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { orderItems, productDetails, products } from "@/database/schema";

export const getOrderItemsByOrderId = async (orderId: string) => {
    try {
        const res = await db
            .select({
                id: products.id,
                orderItemId: orderItems.id,
                name: productDetails.name,
                price: productDetails.price,
                quantity: orderItems.quantity,
            })
            .from(orderItems)
            .innerJoin(products, eq(products.id, orderItems.productId))
            .innerJoin(productDetails, eq(productDetails.id, products.detailId))
            .where(eq(orderItems.orderId, orderId));
        if (!res) {
            return undefined;
        }
        return res;
    } catch {
        return undefined;
    }
};
