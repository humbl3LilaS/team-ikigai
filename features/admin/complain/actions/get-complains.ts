"use server"

import { db } from "@/database/dirzzle";
import { complains } from "@/database/schema";

export const getComplains = async () => {
    try {
        const res = await db.select({
            id: complains.id,
            orderItemId: complains.orderItemId,
            type: complains.type,
            issues: complains.issues,
            status: complains.status,
        }).from(complains);
        if (!res) {
            return undefined;
        }
        return res;
    } catch {
        return undefined;
    }
}

export type TComplains = NonNullable<
    Awaited<ReturnType<typeof getComplains>>
    >[number];
