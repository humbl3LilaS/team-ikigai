"use server";

import { and, count, desc, eq, gte, lt, or, sql } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { deliveries, drivers, orderItems, orders, productDetails, products, stocks, users, warehouseManagers, warehouses } from "@/database/schema";

// Dashboard Page
export const getDeliveringOrders = async () => {
  try {
    return (await db.select({ count: count() }).from(orders).where(eq(orders.status, "ON_THE_WAY")))[0];
  } catch {
    return { count: 0 };
  }
};

export const getUnfinishOrdersCount = async () => {
  try {
    return (await db.select({ count: count() }).from(orders).where(eq(orders.status, "PENDING")))[0];
  } catch {
    return { count: 0 };
  }
};

export const getApprovedOrdersCount = async () => {
  try {
    return (await db.select({ count: count() }).from(orders).where(eq(orders.status, "APPROVE")))[0];
  } catch {
    return { count: 0 };
  }
};


export const getFinishedWeeklySales = async () => {
  try {
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
              eq(orders.status, "ON_THE_WAY"),
            ),
          ),
        )
    );
  } catch {
    return;
  }

};

export const getFinishedMonthlySales = async () => {

  try {
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
  } catch {
    return;
  }

};


export async function getPopularItems() {
  type TItems = {
    product: string;
    quantity: number;
  };

  try {
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
  catch {
    return;
  }

}

export async function getTotalDeliveriesByDriverId(driverId: string) {
  const res = await db
    .select({
      deliStatus: deliveries.deliveryStatus,
      totalDeliveries: count(),
    })
    .from(drivers).where(eq(drivers.userId, driverId))
    .innerJoin(deliveries, eq(deliveries.driverId, drivers.id))
    .groupBy(deliveries.deliveryStatus)
    .orderBy(deliveries.deliveryStatus);
  // console.log(res);
  return res;
}

export async function getRecentDeliveriesByDriverId(driverId: string) {
  const res = await db.select({
    id: deliveries.id,
    date: deliveries.createdAt,
    deliStatus: deliveries.deliveryStatus,
    totalAmount: orders.totalAmount,
    product: productDetails.name,
    img: productDetails.imageUrl,
    brand: productDetails.brand,
    category: productDetails.category,
    productPrice: productDetails.price,
    quantity: orderItems.quantity,
    customerName: users.name,
    customerPhone: users.phoneNumber,
    customerEmail: users.email,
    location: sql<string>`CONCAT(${orders.address}, ', ', ${orders.city}, ', ', ${orders.region})`,
  }).from(drivers)
    .where(and(eq(drivers.userId, driverId), eq(deliveries.deliveryStatus, "DELIVERED")))
    .innerJoin(deliveries, eq(deliveries.driverId, drivers.id))
    .innerJoin(orders, eq(orders.id, deliveries.orderId))
    .innerJoin(orderItems, eq(orderItems.orderId, orders.id))
    .innerJoin(products, eq(products.id, orderItems.productId))
    .innerJoin(productDetails, eq(productDetails.id, products.detailId))
    .innerJoin(users, eq(users.id, orders.userId))
    .limit(5)
    ;
  // console.log(res);
  return res;
}

export async function getCategoriesByWarehouseId(warehouseManagerId: string) {
  const res = await db.select({
    id: warehouses.id,
    warehouseName: warehouses.name,
    phone: warehouses.phoneNumber,
    warehouseManagerName: users.name,
    location: sql<string>`CONCAT(${warehouses.address}, ', ' , ${warehouses.city}, ', ' , ${warehouses.region})`,
  }).from(warehouseManagers)
    .where(eq(warehouseManagers.userId, warehouseManagerId))
    .innerJoin(warehouses, eq(warehouses.managerId, warehouseManagers.id))
    .innerJoin(users, (eq(warehouseManagers.userId, users.id)))
    ;
  // console.log(res);
  return res[0];
}



// Order Page
export const getOrders = async () => {
  try {
    const res = await db.select().from(orders).orderBy(orders.createdAt).where(
      or(
        eq(orders.status, "PENDING"),
        eq(orders.status, "ON_THE_WAY"),
        eq(orders.status, "APPROVE"),
      ),
    );
    return res;
  } catch {
    return;
  }

};

export const getCustomers = async () => {
  try {
    const res = await db.select().from(users).where(eq(users.role, "USER")).orderBy(users.name);
    return res;
  } catch {
    return;
  }
};

export async function getProductsCategory(warehouse: string) {
  try {
    const productStocks = await db
      .select({
        category: productDetails.category,
        stock: sql<number>`SUM(${stocks.stock})`.as("total_stock"),
        warehouse: warehouses.name,
      })
      .from(stocks)
      .innerJoin(products, eq(stocks.productId, products.id))
      .innerJoin(productDetails, eq(products.detailId, productDetails.id))
      .innerJoin(warehouses, eq(warehouses.id, stocks.warehouseId))
      .where(eq(warehouses.name, warehouse))
      .groupBy(productDetails.category, warehouses.name);

    // console.log(productStocks);

    return productStocks.map(({ category, stock }) => ({
      category,
      count: stock,
    }));
  } catch {
    return;
  }

}

export async function getAllWarehouseCategory() {
  try {
    const productStocks = await db
      .select({
        category: productDetails.category,
        stock: sql<number>`SUM(${stocks.stock})`.as("total_stock"),
      })
      .from(stocks)
      .innerJoin(products, eq(stocks.productId, products.id))
      .innerJoin(productDetails, eq(products.detailId, productDetails.id))
      .groupBy(productDetails.category);

    // console.log(productStocks);
    return productStocks.map(({ category, stock }) => ({
      category,
      count: stock,
    }));
  } catch {
    return;
  }

}

export async function getUserNameFromDb(id: string, name?: string) {
  try {
    const res = await db
      .select({ name: users.name })
      .from(users)
      .where(eq(users.id, id));
    return res[0];
  } catch {
    return { name };
  }

}

export async function getAllWarehousesName() {
  const res = await db.select({ name: warehouses.name }).from(warehouses);
  // console.log(res);
  return res;
}

