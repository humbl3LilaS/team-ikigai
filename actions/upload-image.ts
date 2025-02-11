"use server";

import cloudinary from "@/lib/cloudinary";

export const uploadImage = async (
    file: File,
): Promise<{ error: true } | { error: false; imageUrl: string }> => {
    try {
        const imageBuffer = await file.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);
        const imageBase64 = imageData.toString("base64");
        const result = await cloudinary.uploader.upload(
            `data:image/png;base64,${imageBase64}`,
            {
                folder: "myan_tech",
            },
        );
        if (!result) {
            return { error: true };
        }
        return { error: false, imageUrl: result.secure_url! };
    } catch {
        return { error: true };
    }
};
