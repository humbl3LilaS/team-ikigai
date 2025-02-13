"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingCartIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

import { TProductDetailInfo } from "@/actions/get-product-by-id";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import ColorSelector from "@/features/client/cart/components/color-selector";
import QuantitySelector from "@/features/client/cart/components/quantity-selector";
import { useCartStore } from "@/features/client/cart/hooks/use-cart-store";
import { useToast } from "@/hooks/use-toast";
import { CheckoutFormSchema, CheckoutFormSchemaType } from "@/validation";

const AddToCartForm = ({ data }: { data: TProductDetailInfo }) => {
    const increaseQty = useCartStore((state) => state.increaseQuantity);
    const addToCart = useCartStore((state) => state.addToCart);
    const cart = useCartStore((state) => state.cart);

    const form = useForm<CheckoutFormSchemaType>({
        resolver: zodResolver(CheckoutFormSchema),
        defaultValues: {
            colorId: data.variants[0].colorId,
            quantity: 1,
        },
    });

    const { toast } = useToast();
    const onSubmit: SubmitHandler<CheckoutFormSchemaType> = (values) => {
        const product = data.variants.find(
            (item) => item.colorId === values.colorId,
        );
        if (!product) {
            return toast({
                title: "Error Adding Items to Cart",
            });
        }
        const pid = product.productId;
        const stock = product.stock;
        if (values.quantity > stock) {
            return toast({
                title: "Error Adding Items to Cart",
                description: "Invalid quantity.",
                variant: "destructive",
            });
        }
        const newItem = {
            pid,
            cid: values.colorId,
            q: values.quantity,
        };
        const isInCart = cart.find(
            (item) => item.pid === newItem.pid && item.cid === newItem.cid,
        );
        if (!isInCart) {
            addToCart(newItem);
        } else {
            if (isInCart.q + newItem.q > stock) {
                return toast({
                    title: "Error Adding Items to Cart",
                    description: "Invalid quantity.",
                    variant: "destructive",
                });
            }
            increaseQty({ ...newItem, qty: newItem.q });
        }
        toast({
            title: "Product Added To Cart",
        });
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                    options={data.variants}
                                    onChange={field.onChange}
                                    value={field.value}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className={"mt-4 flex items-center gap-x-4"}>
                    <FormField
                        name={"quantity"}
                        control={form.control}
                        render={({ field }) => (
                            <QuantitySelector
                                value={field.value}
                                onQuantityChange={field.onChange}
                            />
                        )}
                    />
                    <Button
                        className={"w-full max-w-[200px] rounded-lg"}
                        type={"submit"}
                    >
                        <ShoppingCartIcon className={"size-8"} />
                        <span>Add to cart</span>
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default AddToCartForm;
