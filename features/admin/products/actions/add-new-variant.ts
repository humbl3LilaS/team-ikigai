"use server";

import { db } from "@/database/dirzzle";
import { productColors, products, stocks } from "@/database/schema";
import { Cause } from "@/features/sign-in/actions/sign-in-actions";

type Payload = {
    detailId: string;
    colorHex: string;
    quantity: number;
    warehouseId: string;
};
export const addNewVariant = async ({
    detailId,
    colorHex,
    warehouseId,
    quantity,
}: Payload): Promise<{ success: true } | { success: false; cause: Cause }> => {
    try {
        const [newColor] = await db
            .insert(productColors)
            .values({ colorHex })
            .returning();

        if (!newColor) {
            return {
                success: false,
                cause: {
                    reason: "Adding Variant Failed",
                },
            };
        }

        const [newProduct] = await db
            .insert(products)
            .values({
                colorId: newColor.id,
                detailId,
            })
            .returning();

        if (!newProduct) {
            return {
                success: false,
                cause: {
                    reason: "Adding Variant Failed",
                },
            };
        }

        const [newStock] = await db
            .insert(stocks)
            .values({
                productId: newProduct.id,
                warehouseId,
                stock: quantity,
            })
            .returning();
        if (!newStock) {
            return {
                success: false,
                cause: {
                    reason: "Creating Stock Failed",
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
                reason: "Error Adding New Color Variant",
            },
        };
    }
};
