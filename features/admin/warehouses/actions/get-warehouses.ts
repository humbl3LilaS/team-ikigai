"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { warehouses,products, stocks, productDetails, users, warehouseManagers } from "@/database/schema";



export const getWarehouses = async () => {
    try {
        const res = await db.select({
            id: warehouses.id,
            managerName: users.name,
            phoneNumber: warehouses.phoneNumber,
            wareHouseName: warehouses.name,
            warehouseAddress: warehouses.address,
            warehouseCity: warehouses.city,
            warehouseRegion: warehouses.region,
        })
            .from(warehouses)
            .innerJoin(warehouseManagers, eq(warehouses.managerId, warehouseManagers.id))
            .innerJoin(users, eq(warehouseManagers.userId, users.id))
            ;
        // console.log(res);
        return res;
    } catch {
        return;
    }
};


export const getWareHouseById = async (id: string) => {
    const res = await db.select().from(warehouses).where(eq(warehouses.id, id));
    return res;
}

export const getProductByWareHouseId = async (id: string)=>{
    const res = await db.select({
        productName: productDetails.name,
        category: productDetails.category,
        brand:productDetails.brand,
        stock:stocks.stock,
    })
    .from(stocks)
    .innerJoin(products, (eq(products.id, stocks.productId)))
    .innerJoin(productDetails,(eq(productDetails.id, products.detailId)))
    .where(eq(stocks.warehouseId, id));
    return res;
}

export type TWarehouse = NonNullable<
    Awaited<ReturnType<typeof getWarehouses>>
>[number];

