"use server";
import { and, eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { productColors, productDetails, products } from "@/database/schema";

export const getCartItemInfo = async (pid: string, cid: string) => {
    try {
        const [productInfo] = await db
            .select({
                id: productDetails.id,
                name: productDetails.name,
                imageUrl: productDetails.imageUrl,
                colorHex: productColors.colorHex,
                price: productDetails.price,
            })
            .from(productDetails)
            .innerJoin(products, eq(products.detailId, productDetails.id))
            .innerJoin(productColors, eq(products.colorId, productColors.id))
            .where(and(eq(productDetails.id, pid), eq(productColors.id, cid)));

        if (!productInfo) {
            return undefined;
        }
        return productInfo;
    } catch {
        return undefined;
    }
};
