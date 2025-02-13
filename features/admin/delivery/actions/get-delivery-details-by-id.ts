import { db } from "@/database/dirzzle";
import { deliveries, drivers, orders, users, orderItems, products, productDetails, invoices } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getDeliveryById = async (id: string) => {
    try {

        const [customerInfo] = await db.select({
            name: users.name,
            phone: users.phoneNumber,
            address: users.address,
            city: users.city,
            region: users.region,
            total: orders.totalAmount,
        }).from(deliveries)
            .innerJoin(orders, eq(orders.id, deliveries.orderId))
            .innerJoin(users, eq(users.id, orders.userId))
            .where(eq(deliveries.id, id));

        const [driverInfo] = await db.select({
            name: users.name,
            phone: users.phoneNumber,
            vehicleNumber: drivers.vehiclePlateNumber
        }).from(deliveries)
            .innerJoin(drivers, eq(drivers.id, deliveries.driverId))
            .innerJoin(users, eq(users.id, drivers.userId))
            .where(eq(deliveries.id, id))

        const orderItemsInfo = await db.select({
            id: orderItems.id,
            name: productDetails.name,
            quantity: orderItems.quantity,
            price: productDetails.price,
        }).from(deliveries)
            .innerJoin(orders, eq(orders.id, deliveries.orderId))
            .innerJoin(orderItems, eq(orderItems.orderId, orders.id))
            .innerJoin(products, eq(orderItems.productId, products.id))
            .innerJoin(productDetails, eq(products.detailId, productDetails.id))
            .where(eq(deliveries.id, id))

        const [deliveryInfo] = await db.select().from(deliveries).where(eq(deliveries.id, id));
        return {
            customer: customerInfo,
            driver: driverInfo,
            delivery: deliveryInfo,
            products: orderItemsInfo
        };
    } catch  {
        return undefined;
    }
 }