"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { products } from "@/database/schema";
import { Cause } from "@/features/sign-in/actions/sign-in-actions";

export const restockProduct = async (
    productId: string,
    quantity: number,
): Promise<{ success: true } | { success: false; cause: Cause }> => {
    try {
        const res = await db
            .update(products)
            .set({
                stock: quantity,
            })
            .where(eq(products.id, productId))
            .returning();
        if (!res) {
            return {
                success: false,
                cause: {
                    reason: "Product Not Found",
                },
            };
        }
        return { success: true };
    } catch (e) {
        if (e instanceof Error) {
            return {
                success: false,
                cause: {
                    reason: e.message,
                },
            };
        }
        return {
            success: false,
            cause: {
                reason: "Error Updating Product's Stock",
            },
        };
    }
};
