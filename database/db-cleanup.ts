import { db } from "@/database/dirzzle";
import {
    deliveries,
    drivers,
    invoices,
    orderItems,
    orders,
    productColors,
    productDetails,
    products,
    serviceCenters,
    users,
    warehouses,
} from "@/database/schema";

try {
    console.log("Cleaning up...");
    await db.delete(deliveries);
    await db.delete(invoices);
    await db.delete(orderItems);
    await db.delete(orders);
    await db.delete(users);
    await db.delete(products);
    await db.delete(productDetails);
    await db.delete(productColors);
    await db.delete(drivers);
    await db.delete(warehouses);
    await db.delete(serviceCenters);
    console.log("Cleaning up complete");
} catch (e) {
    console.log(e);
}
