"use server";

import { eq, sum, desc } from "drizzle-orm";

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
                latestOrderStatus: orders.status,
            })
            .from(users)
            .leftJoin(orders, eq(users.id, orders.userId))
            .where(eq(users.id, userId))
            .orderBy(desc(orders.createdAt))
            .groupBy(users.id, orders.status, orders.createdAt)
            .limit(1);

        if (!userData) return null;

        return {
            ...userData,
            totalSpend: Number(userData.totalSpend),
        };
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};
