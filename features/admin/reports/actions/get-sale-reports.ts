"use server";

import { eq, sql } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { orderItems, orders, productDetails, products, users } from "@/database/schema";

export async function getSaleReports(date: Date) {
    const formattedDate = date.toISOString().split("T")[0];

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
            // totalSum: sql<number>`SUM(${productDetails.price} * ${orderItems.quantity})`,
        })
        .from(orders)
        .where(
            eq(sql`DATE(${orders.createdAt})`, formattedDate),
        )
        .innerJoin(users, eq(orders.userId, users.id))
        .innerJoin(orderItems, eq(orderItems.orderId, orders.id))
        .innerJoin(products, eq(products.id, orderItems.productId))
        .innerJoin(productDetails, eq(productDetails.id, products.detailId))
        // .groupBy(users.id)
        ;
    // console.log(formattedDate,res);
    return res;
}

export type TSaleReports = NonNullable<
    Awaited<ReturnType<typeof getSaleReports>>
>[number];


