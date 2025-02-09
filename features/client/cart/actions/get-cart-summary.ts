"use server";

import { inArray } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { productDetails } from "@/database/schema";

export const getCartSummary = async (pids: string[]) => {
    try {
        const items = await db
            .select({
                pid: productDetails.id,
                price: productDetails.price,
                discount: productDetails.discount,
            })
            .from(productDetails)
            .where(inArray(productDetails.id, pids));
        if (!items) {
            return undefined;
        }
        return items;
    } catch {
        return undefined;
    }
};
