"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { productDetails, TProductUpdateSchema } from "@/database/schema";
import { Cause } from "@/features/sign-in/actions/sign-in-actions";

export const updateProductById = async (
    id: string,
    payload: Partial<TProductUpdateSchema>,
): Promise<{ success: true } | { success: false; cause: Cause }> => {
    try {
        const [updatedProduct] = await db
            .update(productDetails)
            .set({ ...payload })
            .where(eq(productDetails.id, id))
            .returning();

        if (!updatedProduct) {
            return {
                success: false,
                cause: {
                    reason: "Invalid Product",
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
                reason: "Error Updating Product",
            },
        };
    }
};
