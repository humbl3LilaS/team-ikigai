"use server";
import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { complains, IComplain } from "@/database/schema";

export const updateComplain = async (
    complainId: string,
    payload: Partial<IComplain>,
) => {
    const [updatedComplain] = await db
        .update(complains)
        .set(payload)
        .where(eq(complains.id, complainId))
        .returning();
    return updatedComplain;
};
