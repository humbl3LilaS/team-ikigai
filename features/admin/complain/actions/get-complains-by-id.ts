import { db } from "@/database/dirzzle";
import { complains, invoices, orderItems, orders, productColors, productDetails, products, users } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getComplainsById = async (id: string) => {
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
        }).from(complains)
            .innerJoin(orderItems, eq(orderItems.id, complains.orderItemId))
            .innerJoin(orders, eq(orders.id, orderItems.orderId))
            .innerJoin(users, eq(users.id, orders.userId))
            .where(eq(complains.id, id))

        const orderItemsInfo = await db.select({
            productId: orderItems.productId,
            name: productDetails.name,
            quantity: orderItems.quantity,
            productImage: productDetails.imageUrl,
            productColors: productColors.colorHex,
            price: productDetails.price,
            orderItemId: orderItems.id,
            invoiceId: invoices.id,
            complainType: complains.type,
            complainIssues: complains.issues,
            complainStatus: complains.status,
        }).from(complains)
            .innerJoin(orderItems, eq(orderItems.id, complains.orderItemId))
            .innerJoin(products, eq(products.id, orderItems.productId))
            .innerJoin(productDetails, eq(productDetails.id, products.detailId))
            .innerJoin(productColors, eq(productColors.id, products.colorId))
            .innerJoin(orders, eq(orders.id, orderItems.orderId))
            .innerJoin(invoices, eq(invoices.orderId, orders.id))
            .where(eq(complains.id, id));

        return {
            customer: customerInfo,
            products: orderItemsInfo
        };

    } catch {
        return undefined;
    }
}