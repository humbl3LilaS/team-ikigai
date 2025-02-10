"use server";
import { and, eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { productColors, productDetails, products } from "@/database/schema";

export const getCartItemInfo = async (pid: string, cid: string) => {
    try {
        const [productInfo] = await db
            .select({
                id: products.id,
                imageUrl: productDetails.imageUrl,
                name: productDetails.name,
                colorHex: productColors.colorHex,
                price: productDetails.price,
            })
            .from(products)
            .innerJoin(productDetails, eq(products.detailId, productDetails.id))
            .innerJoin(productColors, eq(products.colorId, productColors.id))
            .where(and(eq(products.id, pid), eq(productColors.id, cid)));

        if (!productInfo) {
            return undefined;
        }
        return productInfo;
    } catch {
        return undefined;
    }
};
