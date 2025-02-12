"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import {
    invoices,
    orderItems,
    orders,
    productDetails,
    products,
    users,
} from "@/database/schema";

export const getInvoiceDetailsById = async (id: string) => {
    try {
        const [userInfo] = await db
            .select({
                name: users.name,
                email: users.email,
                contactNumber: orders.contactNumber,
                invoiceDate: invoices.createdAt,
                totalAmount: orders.totalAmount,
            })
            .from(invoices)
            .innerJoin(orders, eq(orders.id, invoices.orderId))
            .innerJoin(users, eq(orders.userId, users.id))
            .where(eq(invoices.id, id));
        if (!userInfo) {
            return undefined;
        }
        const invoiceItems = await db
            .select({
                id: orderItems.id,
                name: productDetails.name,
                quantity: orderItems.quantity,
                price: productDetails.price,
            })
            .from(invoices)
            .innerJoin(orders, eq(orders.id, invoices.orderId))
            .innerJoin(orderItems, eq(orderItems.orderId, orders.id))
            .innerJoin(products, eq(orderItems.productId, products.id))
            .innerJoin(productDetails, eq(products.detailId, productDetails.id))
            .where(eq(invoices.id, id));
        return {
            user: userInfo,
            products: invoiceItems,
        };
    } catch {
        return undefined;
    }
};
