"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import {
    users,
    orders,
    orderItems,
    productDetails,
    products,
    productColors,
} from "@/database/schema";

export const getCustomerDetailsById = async (id: string) => {
    try {
        const userInfo = await db
            .select({
                userId: users.id,
                name: users.name,
                email: users.email,
                phoneNumber: users.phoneNumber,
                address: users.address,
                city: users.city,
                region: users.region,
            })
            .from(users)
            .where(eq(users.id, id));
        if (!userInfo) {
            return undefined;
        }
        const ordersData = await db
            .select({
                orderId: orders.id,
                createdAt: orders.createdAt,
                status: orders.status,
                quantity: orderItems.quantity,
                totalAmount: orders.totalAmount,
                name: productDetails.name,
                colorHex: productColors.colorHex,
                imageUrl: productDetails.imageUrl
            })
            .from(orders)
            .innerJoin(orderItems, eq(orderItems.orderId, orders.id))
            .innerJoin(products, eq(products.id, orderItems.productId))
            .innerJoin(users, eq(orders.userId, users.id))
            .innerJoin(productDetails, eq(products.detailId, productDetails.id))
            .innerJoin(productColors, eq(products.colorId, productColors.id))
            .where(eq(orders.userId, id));
        return {
            user: userInfo,
            ordersData: ordersData,
        };
    } catch {
        return undefined;
    }
};
