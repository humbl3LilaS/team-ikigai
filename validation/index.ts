import { Writeable, z } from "zod";

import { BRAND, PRODUCT_CATEGORY } from "@/constants";
import {
    COMPLAIN_STATUS,
    COMPLAIN_TYPE,
    IComplainStatus,
    IComplainType,
} from "@/database/schema";

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
        .refine((arg) => arg[0] >= 0 && arg[1] <= 10000)
        .refine((arg) => arg[0] < arg[1], {
            message: "Min value cannot be greater than max",
        }),
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

export const ComplainFormSchema = z.object({
    orderId: z.string().min(1),
    orderItemId: z.string().min(1, { message: "Please Select an Order Item" }),
    type: z
        .string()
        .refine((arg) =>
            COMPLAIN_TYPE.enumValues.includes(arg as IComplainType),
        ),
    issue: z.string().min(10, {
        message: "Issue must be at least 10 characters long",
    }),
    faultQty: z.coerce.number().min(1),
});

export type TComplainFormSchema = Zod.infer<typeof ComplainFormSchema>;
