"use server";

import { db } from "@/database/dirzzle";
import { complains, IComplainType } from "@/database/schema";
import { Cause } from "@/features/sign-in/actions/sign-in-actions";
import { TComplainFormSchema } from "@/validation";

export const fileComplain = async (
    payload: TComplainFormSchema,
): Promise<{ success: true } | { success: false; cause: Cause }> => {
    try {
        const promises = payload.orderDetailsId.map(async (item) => {
            return db
                .insert(complains)
                .values({
                    orderItemId: item,
                    issues: payload.issue,
                    type: payload.type as IComplainType,
                })
                .returning();
        });
        const res = await Promise.all(promises);
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
