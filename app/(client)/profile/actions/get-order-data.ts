"use server";

import { eq, inArray, sum } from "drizzle-orm";
import { db } from "@/database/dirzzle";
import { orders, orderItems, products, productDetails } from "@/database/schema";

export const getUserOrders = async (userId: string) => {
  try {
    // Fetch all orders for the given user
    const userOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId));

    // Get all order IDs
    const orderIds = userOrders.map((order) => order.id);

    // Fetch order items with product details by joining orderItems -> products -> productDetails
    const userOrderItems = await db
      .select({
        id: orderItems.id,
        orderId: orderItems.orderId,
        quantity: orderItems.quantity,
        productName: productDetails.name,
        productPrice: productDetails.price,
      })
      .from(orderItems)
      .innerJoin(products, eq(orderItems.productId, products.id))
      .innerJoin(productDetails, eq(products.detailId, productDetails.id))
      .where(inArray(orderItems.orderId, orderIds));

    // Combine orders and their items
    return userOrders.map((order) => ({
      id: order.id,
      orderDate: order.createdAt.toISOString(),
      status: order.status,
      totalAmount: order.totalAmount,
      orderItems: userOrderItems
        .filter((item) => item.orderId === order.id)
        .map((item) => ({
          id: item.id,
          quantity: item.quantity,
          product: {
            name: item.productName,
            price: item.productPrice,
          },
        })),
    }));
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return undefined;
  }
};
