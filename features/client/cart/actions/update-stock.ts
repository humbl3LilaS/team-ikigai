import { desc, eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { stocks } from "@/database/schema";

export async function updateStock(productId: string, quantity: number) {
    try {
        const availableStock = await db
            .select()
            .from(stocks)
            .where(eq(stocks.productId, productId))
            .orderBy(desc(stocks.stock));

        let remainingQty = quantity;

        for (const inStock of availableStock) {
            if (remainingQty <= 0) break;

            const deductQty = Math.min(inStock.stock, remainingQty);

            await db.update(stocks).set({
                stock: inStock.stock - deductQty,
            });

            remainingQty -= deductQty;
        }

        return { success: true };
    } catch {
        return { success: false };
    }
}
