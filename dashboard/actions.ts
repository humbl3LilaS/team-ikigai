"use server";

import { and, count, desc, eq, gte, lt, or, sql, sum } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { orderItems, orders, productDetails, products, users } from "@/database/schema";

// Dashboard Page
export const getFinishedOrdersCount = async () => {
  return (await db.select({ count: count() }).from(orders).where(eq(orders.status, "FINISH")))[0];
};

export const getUnfinishOrdersCount = async () => {
  return (await db.select({ count: count() }).from(orders).where(eq(orders.status, "PENDING")))[0];
};

export const getApprovedOrdersCount = async () => {
  return (await db.select({ count: count() }).from(orders).where(eq(orders.status, "APPROVE")))[0];
};

export const getFinishedWeeklySales = async () => {
  const sevenDaysAgo = sql`NOW() - INTERVAL '7 days'`;
  const yesterday = sql`NOW() - INTERVAL '1 day'`;

  return (
    await db
      .select({
        status: orders.status,
        total: orders.totalAmount,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .where(
        and(
          gte(orders.createdAt, sevenDaysAgo),
          lt(orders.createdAt, yesterday),
          or(
            eq(orders.status, "FINISH"),
            eq(orders.status, "APPROVE"),
          ),
        ),
      )
  );
};

export const getFinishedMonthlySales = async () => {

  const firstDayOfLastMonth = sql`DATE_TRUNC('month', NOW()) - INTERVAL '1 month'`;
  const lastDayOfLastMonth = sql`DATE_TRUNC('month', NOW()) - INTERVAL '1 day'`;

  return (await db
    .select({
      status: orders.status,
      total: orders.totalAmount,
      createdAt: orders.createdAt,
    })
    .from(orders)
    .where(
      and(
        gte(orders.createdAt, firstDayOfLastMonth),
        lt(orders.createdAt, lastDayOfLastMonth),  
        eq(orders.status, "FINISH"),               
      ),
    )
  );
};

export async function getPopularItems() {
  const popularItems = await db
    .select({
      productName: productDetails.name,
      totalQuantity: sum(orderItems.quantity),
    })
    .from(orderItems)
    .innerJoin(products, eq(orderItems.productId, products.id))
    .innerJoin(productDetails, eq(products.detailId, productDetails.id))
    .groupBy(productDetails.name)
    .orderBy(desc(sum(orderItems.quantity)))
    .limit(10);

  return popularItems;
}



// Order Page
export const getOrders = async () => {
  const res = await db.select().from(orders).orderBy(orders.createdAt);
  return res;
};

export const getCustomers = async () => {
  const res = await db.select().from(users).orderBy(users.name);
  return res;
};

export const getCustomerByOrderId = async (id: string) => {
  const res = (await db.select().from(users).where(eq(users.id, id)))[0];
  return res;
};

