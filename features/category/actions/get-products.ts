"use server"

import { db } from "@/database/dirzzle";
import { productDetails } from "@/database/schema";
import { eq, between, and, inArray, or, gt, lt } from "drizzle-orm";

const getAllProducts = async () => {
    try {
        const allProducts = await db.select().from(productDetails);
        if (!allProducts) {
            return undefined;
        }
        return allProducts;
    } catch (error) {
        console.log(error);
    }
}

interface Filters {
    category?: string;
    brand?: string;
    min?: number;
    max?: number;
}

// const getProductWithFilters = async (filters: Filters) => {
//     try {
//         const filteredProducts = await db.select().from(productDetails).where(
//             and(
//                 filters.category ? eq(productDetails.category, filters.category as any) : undefined,
//                 filters.brand ? eq(productDetails.brand, filters.brand as any) : undefined,
//                 (filters.min !== undefined && filters.max !== undefined && typeof filters.min === 'number' && typeof filters.max === 'number') ? between(productDetails.price, filters.min, filters.max) : undefined
//             )
//         );
    
//         return filteredProducts;
//     } catch (error) {
//         console.error("Error fetching filtered products:", error);
//         return [];
//     }
// };

const getProductWithFilters = async (filters: Filters) => {
    console.log(filters.min, filters.max);
    try {
        // Parse the category and brand strings into arrays
        const categories = filters.category ? filters.category.split(',') : [];
        const brands = filters.brand ? filters.brand.split(',') : [];

        // Construct the query
        const conditions = [];

        // Add category conditions
        if (categories.length > 0) {
            const categoryConditions = categories.map(category => eq(productDetails.category, category as any));
            conditions.push(or(...categoryConditions));
        }

        // Add brand conditions
        if (brands.length > 0) {
            const brandConditions = brands.map(brand => eq(productDetails.brand, brand));
            conditions.push(or(...brandConditions));
        }

        // Add price range condition
        if (filters.min !== undefined && filters.max !== undefined) {
            conditions.push(between(productDetails.price, filters.min, filters.max));
        }

        // Combine all conditions with 'and'
        const filteredProducts = await db.select().from(productDetails).where(
            and(...conditions)
            );
        return filteredProducts;
    } catch (error) {
        console.log(error);
    }

}

const getAllCategories = async () => {
    try {
        const allCategories = await db.selectDistinct({category: productDetails.category}).from(productDetails);
        if (!allCategories) {
            return undefined;
        }
        return allCategories;
    } catch (error) {
        console.log(error);
    }
}

const getAllBrands = async () => {
    try {
        const allBrands = await db.selectDistinct({brand: productDetails.brand}).from(productDetails);
        if (!allBrands) {
            return undefined;
        }
        return allBrands;
    } catch (error) {
        console.log(error);
    }
}

export { getAllProducts, getProductWithFilters, getAllCategories, getAllBrands}