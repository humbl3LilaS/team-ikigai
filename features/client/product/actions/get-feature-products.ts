"use server";

import { db } from "@/database/dirzzle";
import { productDetails } from "@/database/schema";

export const getFeatureProducts = async () => {
    try {
        const featureProducts = await db.select().from(productDetails).limit(4);
        if (!featureProducts) {
            return undefined;
        }
        return featureProducts;
    } catch (error) {
        console.log(error);
    }
};
