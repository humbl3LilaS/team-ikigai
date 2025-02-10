"use server";

import { eq, sum } from "drizzle-orm";

import { db } from "@/database/dirzzle";
import { users, orders } from "@/database/schema";

export const getUserData = async (userId: string) => {
    try {
        if (!userId) throw new Error("User ID is required");

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
                totalSpend: sum(orders.totalAmount).as("totalSpend"),
            })
            .from(users)
            .leftJoin(orders, eq(users.id, orders.userId))
            .where(eq(users.id, userId))
            .groupBy(users.id);

        if (!userData) return null;

        return {
            ...userData,
            totalSpend: Number(userData.totalSpend ?? 10000),
        };
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};
