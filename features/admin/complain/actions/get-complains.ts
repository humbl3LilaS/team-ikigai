"use server";

import { desc } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { complains } from "@/database/schema";

export const getComplains = async () => {
    try {
        const res = await db
            .select()
            .from(complains)
            .orderBy(desc(complains.createdAt));
        if (!res) {
            return undefined;
        }
        return res;
    } catch {
        return undefined;
    }
};

export type TComplains = NonNullable<
    Awaited<ReturnType<typeof getComplains>>
>[number];
