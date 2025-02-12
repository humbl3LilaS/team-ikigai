"use server";

import { and, gt, inArray, lt, lte } from "drizzle-orm";

import { CategoryPageQuery } from "@/app/(client)/category/page";
import { db } from "@/database/dirzzle";
import { IProductCategory, productDetails } from "@/database/schema";
import { calculatePageCounts, slugToArray } from "@/lib/utils";

export const getProductByCategory = async (query: CategoryPageQuery) => {
    try {
        const category = slugToArray(
            query.category,
        ) as unknown as IProductCategory[];
        const brand = slugToArray(query.brands) as unknown as string[];
        const max = query.max ? parseInt(query.max) : 10000;
        const min = query.min ? parseInt(query.min) : 0;
        const result = await db
            .select()
            .from(productDetails)
            .where(
                and(
                    category.length > 0
                        ? inArray(productDetails.category, category)
                        : undefined,
                    brand.length > 0
                        ? inArray(productDetails.brand, brand)
                        : undefined,
                    gt(productDetails.price, min),
                    lte(productDetails.price, max),
                ),
            );
        if (!result) {
            return undefined;
        }
        return result;
    } catch {
        return undefined;
    }
};
