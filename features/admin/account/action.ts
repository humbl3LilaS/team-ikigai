"use server";

import { eq } from "drizzle-orm";

import { auth } from "@/auth";
import { db } from "@/database/dirzzle";
import { users } from "@/database/schema";

export async function updateUsername(newUsername: string) {
  try {
    const session = await auth();
    if (!session?.user.id) throw new Error("User not authenticated");

    await db
      .update(users)
      .set({ name: newUsername })
      .where(eq(users.id, session.user.id));

    return { success: true };
  } catch (error) {
    console.error("Error updating username:", error);
    throw new Error("Failed to update username");
  }
}