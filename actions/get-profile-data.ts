"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { users } from "@/database/schema";

export const getProfileData = async (id: string) => {
    try {
        const [profile] = await db.select().from(users).where(eq(users.id, id));
        if (!profile) {
            return undefined;
        }
        return profile;
    } catch {
        return undefined;
    }
};
