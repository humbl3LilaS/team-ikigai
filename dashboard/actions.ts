"use server";

import { count, eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { orders, users } from "@/database/schema";

  // Dashboard Page
export const getFinishedOrdersCount = async () => {
  return (await db.select({count: count()}).from(orders).where(eq(orders.status, "FINISH")))[0];
};

export const getUnfinishOrdersCount = async () => {
  return (await db.select({count: count()}).from(orders).where(eq(orders.status, "PENDING")))[0];
};

export const getApprovedOrdersCount = async () => {
  return (await db.select({count: count()}).from(orders).where(eq(orders.status, "APPROVE")))[0];
};

export const getFinishedSales = async () => {
  return (await db.select({status: orders.status, total: orders.totalAmount, createdAt: orders.createdAt}).from(orders).where(eq(orders.status, "FINISH")));
  // const res = await db.select({sataus: orders.status, total: orders.totalAmount, createdAt: orders.createdAt})
};


// Order Page
export const getOrders = async () => {
  const res = await db.select().from(orders).orderBy(orders.createdAt);
  return res;
};

export const getCustomers = async () => {
  const res = await db.select().from(users).orderBy(users.name);
  return res;
};

export const getCustomerByOrderId = async (id:string) => {
  const res = (await db.select().from(users).where(eq(users.id, id)))[0];
  return res;
};

