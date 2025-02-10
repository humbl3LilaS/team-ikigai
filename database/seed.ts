import { en, Faker } from "@faker-js/faker";
import { hash } from "bcryptjs";
import { subDays } from "date-fns";
import { eq } from "drizzle-orm";

import { PRODUCT_PLACEHOLDER, REGION, TOWNSHIPS } from "@/constants";
import { db } from "@/database/dirzzle";
import {
    deliveries,
    drivers,
    invoices,
    IOrderStatus,
    IProductCategory,
    ORDER_STATUS,
    orderItems,
    orders,
    productColors,
    productDetails,
    products,
    serviceCenters,
    users,
    warehouses,
} from "@/database/schema";

async function main() {
    const faker = new Faker({ locale: [en] });
    const hashedPassword = await hash("P@ssword123", 10);

    console.log("seeding start....");

    await db.delete(invoices);
    await db.delete(orderItems);
    await db.delete(orders);
    await db.delete(users);
    const generatedUsers = Array.from(
        {
            length: 10,
        },
        () => {
            const region = faker.helpers.arrayElement(REGION);
            const city = faker.helpers.arrayElement(TOWNSHIPS[region]);
            return {
                email: faker.internet.email(),
                password: hashedPassword,
                name: faker.internet.username(),
                address: faker.location.streetAddress(),
                region,
                city,
                phoneNumber: `09${faker.string.numeric(9)}`,
            };
        },
    );
    const createdUsers = await db
        .insert(users)
        .values(generatedUsers)
        .returning({ id: users.id });
    const newUserIds = createdUsers.map((item) => item.id);

    await db.delete(products);
    await db.delete(productDetails);
    const generatedProductDetails = PRODUCT_PLACEHOLDER.map((item) => ({
        ...item,
        category: item.category as IProductCategory,
        price: faker.helpers.rangeToNumber({ min: 1000, max: 3500 }),
        description: faker.lorem.sentence(),
    }));

    const newProductDetails = await db
        .insert(productDetails)
        .values(generatedProductDetails)
        .returning({ id: productDetails.id, price: productDetails.price });

    const newProductDetailsId = newProductDetails.map((item) => item.id);

    await db.delete(productColors);
    const generatedProductColors = Array.from(
        { length: PRODUCT_PLACEHOLDER.length * 3 },
        () => ({
            colorHex: faker.color.rgb(),
        }),
    );
    const newProductColors = await db
        .insert(productColors)
        .values(generatedProductColors)
        .returning({ id: productColors.id });

    const newProductColorsId = newProductColors.map((item) => item.id);

    await db.delete(drivers);
    await db.delete(warehouses);
    const generatedWareHouses = Array.from({ length: 10 }, () => {
        const region = faker.helpers.arrayElement(REGION);
        const city = faker.helpers.arrayElement(TOWNSHIPS[region]);
        return {
            region,
            city,
            phoneNumber: `09${faker.string.numeric(9)}`,
        };
    });
    const newWarehouses = await db
        .insert(warehouses)
        .values(generatedWareHouses)
        .returning({ id: warehouses.id });

    const newWareHousesId = newWarehouses.map((item) => item.id);

    const generatedDrivers = Array.from({ length: 20 }, () => {
        const region = faker.helpers.arrayElement(REGION);
        const city = faker.helpers.arrayElement(TOWNSHIPS[region]);
        return {
            deliveryRoute: city,
            vehiclePlateNumber: faker.string.numeric(9),
            warehouseId: faker.helpers.arrayElement(newWareHousesId),
        };
    });

    const newDrivers = await db
        .insert(drivers)
        .values(generatedDrivers)
        .returning({ id: drivers.id });
    const newDriversId = newDrivers.map((item) => item.id);

    const generatedProducts = newProductDetailsId.map((item) => {
        return Array.from({ length: 3 }, () => ({
            detailId: item,
            colorId: faker.helpers.arrayElement(newProductColorsId),
            warehouseId: faker.helpers.arrayElement(newWareHousesId),
            stock: faker.helpers.rangeToNumber({ min: 50, max: 100 }),
        }));
    });
    const newProducts = await db
        .insert(products)
        .values(generatedProducts.flat())
        .returning({ id: products.id, detailId: products.detailId });
    const newProductsId = newProducts.map((item) => item.id);

    const generatedOrders = Array.from({ length: 60 }, () => {
        const region = faker.helpers.arrayElement(REGION);
        const city = faker.helpers.arrayElement(TOWNSHIPS[region]);
        return {
            userId: faker.helpers.arrayElement(newUserIds),
            orderDate: faker.date.between({
                from: subDays(Date.now(), 60),
                to: subDays(Date.now(), 1),
            }),
            status: faker.helpers.arrayElement(
                ORDER_STATUS.enumValues,
            ) as IOrderStatus,
            totalAmount: 0,
            region,
            city,
            address: faker.location.streetAddress(),
            contactNumber: `09${faker.string.numeric(9)}`,
        };
    });
    let newOrders = await db.insert(orders).values(generatedOrders).returning();

    const newOrdersId = newOrders.map((item) => item.id);

    const generatedOrderItems = newOrdersId.map((orderId) => {
        return Array.from({ length: 3 }, () => {
            const productId = faker.helpers.arrayElement(newProductsId);
            const detailId = newProducts.find(
                (item) => item.id === productId,
            )!.detailId;
            const price = newProductDetails.find(
                (item) => item.id === detailId,
            )!.price;
            const quantity = faker.helpers.rangeToNumber({ min: 1, max: 3 });
            const initialTotalAmount = newOrders.find(
                (item) => item.id === orderId,
            )!.totalAmount;
            const totalAmount = price * quantity;

            newOrders = newOrders.map((item) => {
                if (item.id === orderId) {
                    return {
                        ...item,
                        totalAmount: totalAmount + initialTotalAmount,
                    };
                } else {
                    return item;
                }
            });
            return {
                orderId,
                productId,
                quantity,
            };
        });
    });

    const priceUpdatePromise = newOrders.map(async (item) => {
        return db
            .update(orders)
            .set({
                totalAmount: item.totalAmount,
            })
            .where(eq(orders.id, item.id));
    });

    await Promise.all(priceUpdatePromise);

    await db
        .insert(orderItems)
        .values(generatedOrderItems.flat())
        .returning({ id: orderItems.id });

    const finishedOrdersId = newOrders
        .filter((item) => item.status === "FINISH")
        .map((item) => ({
            orderId: item.id,
        }));

    await db.insert(invoices).values(finishedOrdersId);

    await db.delete(deliveries);
    const onTheWayOrdersId = newOrders
        .filter((item) => item.status === "ON_THE_WAY")
        .map((item) => item.id);

    const generatedDeliveries = onTheWayOrdersId.map((item) => ({
        orderId: item,
        driverId: faker.helpers.arrayElement(newDriversId),
    }));

    await db.insert(deliveries).values(generatedDeliveries).returning();

    await db.delete(serviceCenters);
    const generatedServiceCenter = Array.from({ length: 10 }, () => {
        const city = faker.helpers.arrayElement(TOWNSHIPS["Yangon"]);
        return {
            centerName: faker.company.name(),
            address: faker.location.streetAddress(),
            city,
            region: "Yangon",
            phoneNumber: `09${faker.string.numeric(9)}`,
        };
    });
    await db.insert(serviceCenters).values(generatedServiceCenter).returning();

    console.log("seeding end");
}

try {
    await main();
} catch (err) {
    console.log(err);
}

export {};
