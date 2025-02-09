"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { RProductInfo } from "@/actions/get-product-by-id";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import ColorSelector from "@/features/client/cart/components/color-selector";
import { CheckoutFormSchema, CheckoutFormSchemaType } from "@/validation";

const AddToCartForm = ({ data }: { data: RProductInfo }) => {
    const form = useForm<CheckoutFormSchemaType>({
        resolver: zodResolver(CheckoutFormSchema),
        defaultValues: {
            colorId: data.colors[0].id,
            productId: data.id,
            quantity: 1,
        },
    });

    const onSubmit: SubmitHandler<CheckoutFormSchemaType> = (data) => {
        console.log(data);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div>
                    <FormField
                        name={"colorId"}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={"text-black/40"}>
                                    Available Colors
                                </FormLabel>
                                <FormControl>
                                    <ColorSelector
                                        options={data.colors}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    );
};

export default AddToCartForm;
