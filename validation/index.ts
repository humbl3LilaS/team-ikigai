import { z } from "zod";

export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export type SignInSchemaType = Zod.infer<typeof SignInSchema>;

export const CheckoutFormSchema = z.object({
    colorId: z.string().min(1),
    productId: z.string().min(1),
    quantity: z.coerce.number().min(1),
});

export type CheckoutFormSchemaType = Zod.infer<typeof CheckoutFormSchema>;
