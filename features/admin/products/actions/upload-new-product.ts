"use server";

import { uploadImage } from "@/actions/upload-image";
import { db } from "@/database/dirzzle";
import {
    productColors,
    productDetails,
    products,
    stocks,
    TProductInsertSchema,
} from "@/database/schema";
import { Cause } from "@/features/sign-in/actions/sign-in-actions";

export const uploadNewProduct = async (
    payload: TProductInsertSchema,
): Promise<
    { success: true; newProductId: string } | { success: false; cause: Cause }
> => {
    try {
        if (!payload.image) {
            return { success: false, cause: { reason: "Missing Cover Image" } };
        }
        const imageUploadRes = await uploadImage(payload.image);
        if (imageUploadRes.error) {
            return { success: false, cause: { reason: "Image Upload Failed" } };
        }
        const [newProductDetails] = await db
            .insert(productDetails)
            .values({
                imageUrl: imageUploadRes.imageUrl,
                description: payload.description,
                price: payload.price,
                category: payload.category,
                brand: payload.brand,
                discount: payload.discount ?? 0,
                name: payload.name,
            })
            .returning();

        if (!newProductDetails) {
            return {
                success: false,
                cause: {
                    reason: "Failed To Create New Product",
                },
            };
        }

        const [newProductColor] = await db
            .insert(productColors)
            .values({
                colorHex: payload.colorHex,
            })
            .returning();

        if (!newProductColor) {
            return {
                success: false,
                cause: {
                    reason: "Failed To Create New Product",
                },
            };
        }

        const [newProduct] = await db
            .insert(products)
            .values({
                detailId: newProductDetails.id,
                colorId: newProductColor.id,
            })
            .returning();

        if (!newProduct) {
            return {
                success: false,
                cause: {
                    reason: "Failed To Create New Product",
                },
            };
        }

        const [newStock] = await db
            .insert(stocks)
            .values({
                productId: newProduct.id,
                warehouseId: payload.warehouseId,
                stock: payload.stock,
            })
            .returning();

        if (!newStock) {
            return {
                success: false,
                cause: {
                    reason: "Failed To Create New Product",
                },
            };
        }
        return { success: true, newProductId: newProductDetails.id };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                cause: {
                    reason: error.message,
                },
            };
        }
        return {
            success: false,
            cause: {
                reason: "Error Creating New Product",
            },
        };
    }
};
