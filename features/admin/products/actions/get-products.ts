"use server";
import { db } from "@/database/dirzzle";
import { productDetails } from "@/database/schema";

export const getProducts = async () => {
    try {
        const productInfo = await db.select().from(productDetails);
        if (!productInfo) {
            return undefined;
        }
        return productInfo;
    } catch {
        return undefined;
    }
};

export type TProductInfo = NonNullable<
    Awaited<ReturnType<typeof getProducts>>
>[number];
