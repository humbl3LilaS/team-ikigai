"use server";

import { and, count, desc, eq, gte, lt, or, sql } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { orderItems, orders, productDetails, products, stocks, users } from "@/database/schema";

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
  type TItems = {
    product: string;
    quantity: number;
  };

  const popularItems = await db
    .select({
      product: productDetails.name,
      quantity: sql<number>`SUM(${orderItems.quantity})`.as("quantity_sold"),
    })
    .from(orderItems)
    .innerJoin(products, eq(orderItems.productId, products.id))
    .innerJoin(productDetails, eq(products.detailId, productDetails.id))
    .groupBy(productDetails.name)
    .limit(5)
    .orderBy(desc(sql`quantity_sold`));

  return popularItems.map((item) => ({
    ...item,
    quantity: Number(item.quantity),
  })) satisfies TItems[];
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

export async function getProductsCategory() {
  const productStocks = await db
    .select({
      category: productDetails.category,
      stock: sql<number>`SUM(${stocks.stock})`.as("total_stock"),
    })
    .from(stocks)
    .innerJoin(products, eq(stocks.productId, products.id))
    .innerJoin(productDetails, eq(products.detailId, productDetails.id))
    .groupBy(productDetails.category);

  return productStocks.map(({ category, stock }) => ({
    category,
    count: stock,
  }));
}

export async function getUserNameFromDb(id:string) {
  const res = await db
    .select({ name: users.name })
    .from(users)
    .where(eq(users.id, id));
    return res[0];
}


