"use server";

import { eq, sql } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { orderItems, orders, productDetails, products, users } from "@/database/schema";


export async function getSaleReports(date: string) {

    const res = await db
        .select({
            id: orderItems.id,
            date: orders.createdAt,
            name: users.name,
            address: users.address,
            city: users.city,
            region: users.region,
            itemName: productDetails.name,
            itemBrand: productDetails.brand,
            itemCategory: productDetails.category,
            price: productDetails.price,
            quantity: orderItems.quantity,
            total: orders.totalAmount,
            orderStatus: orders.status,
            totalSum: sql<number>`SUM(${productDetails.price} * ${orderItems.quantity})`.as("totalSum"),
        })
        .from(orders)
        .innerJoin(users, eq(orders.userId, users.id))
        .innerJoin(orderItems, eq(orderItems.orderId, orders.id))
        .innerJoin(products, eq(products.id, orderItems.productId))
        .innerJoin(productDetails, eq(productDetails.id, products.detailId))
        .where(
            eq(sql`DATE(${orders.createdAt})`, date),
        )
        .groupBy(
            orderItems.id, orders.createdAt, users.name, users.address, users.city, users.region,
            productDetails.name, productDetails.brand, productDetails.category, productDetails.price,
            orderItems.quantity, orders.totalAmount, orders.status,
        );
        // console.log(res);
    return res;
}

export type TSaleReports = NonNullable<
    Awaited<ReturnType<typeof getSaleReports>>
>[number];


