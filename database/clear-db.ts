import { db } from "@/database/dirzzle";
import {
    drivers,
    orderItems,
    orders,
    productColors,
    productDetails,
    products,
    users,
    warehouses,
} from "@/database/schema";

try {
    console.log("Cleaning up...");
    await db.delete(orderItems);
    await db.delete(orders);
    await db.delete(users);
    await db.delete(products);
    await db.delete(productDetails);
    await db.delete(productColors);
    await db.delete(drivers);
    await db.delete(warehouses);
    console.log("Cleaning up complete");
} catch (e) {
    console.log(e);
}
