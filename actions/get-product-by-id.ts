"use server";

import { db } from "@/database/dirzzle";
import { productColors, productDetails, products } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getProductById = async (id: string) => {
    try {
        const [product] = await db
            .select()
            .from(productDetails)
            .where(eq(productDetails.id, id));
        if (!product) {
            return undefined;
        }

        const colors = await db
            .select({
                colorHex: productColors.colorHex,
                stock: products.stock,
            })
            .from(products)
            .innerJoin(productColors, eq(productColors.id, products.colorId))
            .where(eq(products.detailId, id));
        return {
            ...product,
            colors,
        };
    } catch (err) {
        console.log(err);
    }
};
