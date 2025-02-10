"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { productColors, productDetails, products } from "@/database/schema";

export const getProductById = async (id: string) => {
    try {
        const [product] = await db
            .select()
            .from(productDetails)
            .where(eq(productDetails.id, id));
        if (!product) {
            return undefined;
        }

        const variants = await db
            .select({
                productId: products.id,
                colorId: productColors.id,
                colorHex: productColors.colorHex,
                stock: products.stock,
            })
            .from(products)
            .innerJoin(productColors, eq(productColors.id, products.colorId))
            .where(eq(products.detailId, id));
        return {
            ...product,
            variants,
        };
    } catch {
        return undefined;
    }
};

export type RProductInfo = NonNullable<
    Awaited<ReturnType<typeof getProductById>>
>;
