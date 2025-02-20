"use server";

import { db } from "@/database/dirzzle";
import { complains, IComplainType } from "@/database/schema";
import { Cause } from "@/features/sign-in/actions/sign-in-actions";
import { TComplainFormSchema } from "@/validation";

export const fileComplain = async (
    payload: TComplainFormSchema,
): Promise<{ success: true } | { success: false; cause: Cause }> => {
    try {
        const res = await db
            .insert(complains)
            .values({
                orderItemId: payload.orderItemId,
                issues: payload.issue,
                type: payload.type as IComplainType,
                faultQty: payload.faultQty,
            })
            .returning();

        if (!res) {
            return {
                success: false,
                cause: {
                    reason: "Error Creating Complaint",
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
                reason: "Error Creating Complaint",
            },
        };
    }
};
