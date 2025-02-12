"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/database/dirzzle";
import { users } from "@/database/schema";
import { IUser } from "../type/usertype";

export const updateUser = async (id: string, data: IUser) => {
    try {
        if (!id) throw new Error("User ID is required");

        await db.update(users)
            .set({
                name: data.name,
                phoneNumber: data.phoneNumber,
                address: data.address,
                city: data.city,
                region: data.region,
            })
            .where(eq(users.id, id));

        revalidatePath("/profile");

        return { success: true, message: "Profile updated successfully!" };
    } catch (error) {
        console.error("Error updating user:", error);
        return { success: false, message: "Failed to update profile." };
    }
};
