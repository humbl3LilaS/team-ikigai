"use server";

import { eq, inArray } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { productDetails, products } from "@/database/schema";

export const getCartSummary = async (pids: string[]) => {
    try {
        const items = await db
            .select({
                pid: products.id,
                price: productDetails.price,
                discount: productDetails.discount,
            })
            .from(products)
            .innerJoin(productDetails, eq(products.detailId, productDetails.id))
            .where(inArray(products.id, pids));
        if (!items) {
            return undefined;
        }
        return items;
    } catch {
        return undefined;
    }
};
