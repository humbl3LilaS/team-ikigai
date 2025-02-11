"use server";

import { db } from "@/database/dirzzle";
import { warehouses } from "@/database/schema";

export const getWarehouses = async () => {
    const res = await db.select().from(warehouses);
    return res;
};
