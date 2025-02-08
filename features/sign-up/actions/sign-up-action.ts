"use server";

import { IUserInsert, users } from "@/database/schema";
import {
    Cause,
    signInWithCredential,
} from "@/features/sign-in/actions/sign-in-actions";
import { db } from "@/database/dirzzle";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";

export const signUp = async (
    payload: IUserInsert,
): Promise<{ success: true } | { success: false; cause: Cause }> => {
    try {
        const [existingUser] = await db
            .select()
            .from(users)
            .where(eq(users.email, payload.email));
        if (existingUser) {
            return {
                success: false,
                cause: {
                    reason: "User already exists",
                },
            };
        }
        const hashedPassword = await hash(payload.password, 10);
        const [new_user] = await db.insert(users).values(payload).returning();
        if (!new_user) {
            return {
                success: false,
                cause: {
                    reason: "User Creation Failed",
                },
            };
        }
        await signInWithCredential({
            email: payload.email,
            password: payload.password,
        });
        return { success: true };
    } catch (e) {
        if (e instanceof Error) {
            return {
                success: false,
                cause: {
                    reason: e.message,
                },
            };
        }
        return {
            success: false,
            cause: {
                reason: "Error During SignIn Process",
            },
        };
    }
};
