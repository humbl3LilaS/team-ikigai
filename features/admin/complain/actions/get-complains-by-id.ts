import { desc, eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import {
    complains,
    invoices,
    orderItems,
    orders,
    productColors,
    productDetails,
    products,
    users,
} from "@/database/schema";

export const getComplainsById = async (id: string) => {
    try {
        const [res] = await db
            .select({
                id: complains.id,
                createdAt: complains.createdAt,
                type: complains.type,
                issues: complains.issues,
                orderItemId: orderItems.id,
                invoiceId: invoices.id,
                customer: {
                    name: users.name,
                    phone: users.phoneNumber,
                    email: users.email,
                },
                product: {
                    imageUrl: productDetails.imageUrl,
                    name: productDetails.name,
                    colorHex: productColors.colorHex,
                    price: productDetails.price,
                },
            })
            .from(complains)
            .innerJoin(orderItems, eq(complains.orderItemId, orderItems.id))
            .innerJoin(products, eq(orderItems.productId, products.id))
            .innerJoin(productDetails, eq(products.detailId, productDetails.id))
            .innerJoin(productColors, eq(products.colorId, productColors.id))
            .innerJoin(orders, eq(orderItems.orderId, orders.id))
            .innerJoin(invoices, eq(orders.id, invoices.orderId))
            .innerJoin(users, eq(orders.userId, users.id))
            .where(eq(complains.id, id))
            .orderBy(desc(complains.createdAt));
        if (!res) {
            return undefined;
        }
        return res;
    } catch {
        return undefined;
    }
};
