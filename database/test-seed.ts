import { db } from "@/database/dirzzle";
import { orderItems, productDetails, products } from "@/database/schema";
import { eq } from "drizzle-orm";

try {
    const oItems = await db
        .select({
            orderId: orderItems.orderId,
            productId: products.id,
            price: productDetails.price,
            quantity: orderItems.quantity,
        })
        .from(orderItems)
        .innerJoin(products, eq(products.id, orderItems.productId))
        .innerJoin(productDetails, eq(products.detailId, productDetails.id))
        .where(eq(orderItems.orderId, "00e25e7e-d6f0-4c3d-af98-147daa15c0a8"));
    console.log(oItems);
} catch (err) {
    console.log(err);
}
