"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { productDetails } from "@/database/schema";
import { Cause } from "@/features/sign-in/actions/sign-in-actions";

export const deleteProductById = async (
    productId: string,
): Promise<{ success: true } | { success: false; cause: Cause }> => {
    try {
        const [deleteProduct] = await db
            .delete(productDetails)
            .where(eq(productDetails.id, productId))
            .returning();
        if (!deleteProduct) {
            return {
                success: false,
                cause: {
                    reason: "Error Deleting Product",
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
                reason: "Error Deleting Product",
            },
        };
    }
};
