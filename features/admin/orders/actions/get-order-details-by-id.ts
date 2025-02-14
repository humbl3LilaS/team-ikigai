import { db } from "@/database/dirzzle";
import { orderItems, orders, productColors, productDetails, products, users } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getOrderById = async (id: string) => { 
    try {
        const [customerInfo] = await db.select({
            name: users.name,
            phone: users.phoneNumber,
            email: users.email,
            address: users.address,
            city: users.city,
            region: users.region,
            orderId: orders.id,
            orderDate: orders.createdAt,
            total: orders.totalAmount,
        }).from(orders)
            .innerJoin(users, eq(users.id, orders.userId))
            .where(eq(orders.id, id));

        const orderItemsInfo = await db.select({
            productId: orderItems.productId,
            name: productDetails.name,
            quantity: orderItems.quantity,
            productImage: productDetails.imageUrl,
            productColors: productColors.colorHex,
            price: productDetails.price,
        }).from(orders)
            .innerJoin(orderItems, eq(orderItems.orderId, orders.id))
            .innerJoin(products, eq(products.id, orderItems.productId))
            .innerJoin(productDetails, eq(products.detailId, productDetails.id))
            .innerJoin(productColors, eq(products.colorId, productColors.id))
            .where(eq(orders.id, id));
        
        return {
            customer: customerInfo,
            products: orderItemsInfo
        };
    } catch {
        return undefined;
    }
}