"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { users } from "@/database/schema";

export const getUserData = async (userId: string) => {
    try {
        const [userData] = await db
            .select({
                id: users.id,
                name: users.name,
                email: users.email,
                role: users.role,
                phoneNumber: users.phoneNumber,
                address: users.address ?? "No Address",
                city: users.city ?? "No City",
                region: users.region ?? "No Region",
            })
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);

        if (!userData) return null;

        return userData;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};
