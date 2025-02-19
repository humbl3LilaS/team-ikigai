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
    stocks,
    users,
    warehouseManagers,
    warehouses,
} from "@/database/schema";

export async function cleanUp() {
    console.log("Cleaning up...");
    await db.delete(deliveries);
    await db.delete(invoices);
    await db.delete(orderItems);
    await db.delete(orders);
    await db.delete(stocks);
    await db.delete(products);

    await db.delete(productColors);

    await db.delete(productDetails);

    await db.delete(drivers);
    await db.delete(warehouses);
    await db.delete(warehouseManagers);
    await db.delete(users);
    await db.delete(serviceCenters);
    console.log("Cleaning up complete");
}

// try {
//     console.log("Cleaning cleanup...");
//     await cleanUp();
//     console.log("Cleaning cleanup Finish");
// } catch (err) {
//     console.log(err);
// }
