"use server";

import { signIn } from "@/auth";
import { SignInSchemaType } from "@/validation";

export type Cause = {
    reason: string;
};
export const signInWithCredential = async ({
    email,
    password,
}: SignInSchemaType): Promise<
    { success: true } | { success: false; cause: Cause }
> => {
    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        if (!result) {
            return {
                success: false,
                cause: {
                    reason: "Wrong Credentials",
                },
            };
        }
        return { success: true };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                cause: {
                    reason: error.message,
                },
            };
        }
        return {
            success: false,
            cause: {
                reason: "Error During Login Process",
            },
        };
    }
};
