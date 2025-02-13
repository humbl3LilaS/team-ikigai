"use server";

import { db } from "@/database/dirzzle";
import { IOrderInsert, orderItems, orders } from "@/database/schema";
import { updateStock } from "@/features/client/cart/actions/update-stock";
import { ICartItem } from "@/features/client/cart/hooks/use-cart-store";
import { Cause } from "@/features/sign-in/actions/sign-in-actions";

export const submitCheckout = async (
    cart: ICartItem[],
    payload: IOrderInsert,
): Promise<{ success: true } | { success: false; cause: Cause }> => {
    try {
        const [order] = await db.insert(orders).values(payload).returning();
        if (!order) {
            return {
                success: false,
                cause: {
                    reason: "Invalid Checkout Information",
                },
            };
        }

        const orderItemsPromise = cart.map((item) => {
            return db.insert(orderItems).values({
                orderId: order.id,
                productId: item.pid,
                quantity: item.q,
            });
        });

        await Promise.all(orderItemsPromise);

        const warehousePromise = cart.map((item) => {
            return updateStock(item.pid, item.q);
        });

        await Promise.all(warehousePromise);
        return { success: true };
    } catch {
        return {
            success: false,
            cause: {
                reason: "Error during checkout",
            },
        };
    }
};
