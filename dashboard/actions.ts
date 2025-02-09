import { db } from "@/database/dirzzle";
import { orders } from "@/database/schema";
import { count, eq } from "drizzle-orm";

export const getFinishedOrdersCount = async () => {
    return (
        await db
            .select({ count: count() })
            .from(orders)
            .where(eq(orders.status, "FINISH"))
    )[0];
};

export const getUnfinishOrdersCount = async () => {
    return (
        await db
            .select({ count: count() })
            .from(orders)
            .where(eq(orders.status, "PENDING"))
    )[0];
};

export const getApprovedOrdersCount = async () => {
    return (
        await db
            .select({ count: count() })
            .from(orders)
            .where(eq(orders.status, "APPROVE"))
    )[0];
};
