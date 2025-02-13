"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { users, warehouseManagers, warehouses } from "@/database/schema";

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

export type TWarehouse = NonNullable<
    Awaited<ReturnType<typeof getWarehouses>>
>[number];
