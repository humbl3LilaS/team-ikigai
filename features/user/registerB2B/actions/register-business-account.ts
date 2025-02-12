"use server";

import { db } from "@/database/dirzzle";
import { BusinessRegistrationType , businessAccounts} from "@/features/user/registerB2B/type/business-table";

export const registerBusiness = async (userId: string, data: BusinessRegistrationType) => {
    try {
        if (!userId) throw new Error("User ID is required");

        await db.insert(businessAccounts).values({
            ownerUserId: userId,
            businessName: data.businessName,
            businessSize: data.businessSize,
            website: data.website,
            description: data.description,
            status: "PENDING",
        });

        return { success: true, message: "Business registration submitted. Waiting for approval." };
    } catch (error) {
        console.error("Error registering business:", error);
        return { success: false, message: "Failed to register business." };
    }
};
