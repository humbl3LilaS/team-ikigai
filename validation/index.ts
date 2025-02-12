import { Writeable, z } from "zod";

import { BRAND, PRODUCT_CATEGORY } from "@/constants";

export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export type SignInSchemaType = Zod.infer<typeof SignInSchema>;

export const CheckoutFormSchema = z.object({
    colorId: z.string().min(1),
    quantity: z.coerce.number().min(1),
});

export type CheckoutFormSchemaType = Zod.infer<typeof CheckoutFormSchema>;

export const FilterFormSchema = z.object({
    priceRange: z
        .custom<[number, number]>()
        .refine((arg) => arg[0] >= 0 && arg[1] <= 10000),
    categories: z
        .string()
        .refine((arg) =>
            ([...PRODUCT_CATEGORY] as Writeable<string[]>).includes(arg),
        )
        .array(),
    brands: z
        .string()
        .refine((arg) => ([...BRAND] as Writeable<string[]>).includes(arg))
        .array(),
});

export type TFilterFormSchema = Zod.infer<typeof FilterFormSchema>;
