"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { REGION, TOWNSHIPS } from "@/constants";
import { IOrderInsert, IUserInfo, orderInsertSchema } from "@/database/schema";
import { submitCheckout } from "@/features/client/cart/actions/submit-checkout";
import { useCartStore } from "@/features/client/cart/hooks/use-cart-store";
import { useCartSummary } from "@/features/client/cart/hooks/use-cart-summary";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const CheckoutForm = ({ defaultValues }: { defaultValues: IUserInfo }) => {
    const router = useRouter();
    const summary = useCartSummary();
    const cart = useCartStore((state) => state.cart);
    const emptyCart = useCartStore((state) => state.emptyCart);

    const { toast } = useToast();
    const queryClient = useQueryClient();

    const form = useForm<IOrderInsert>({
        resolver: zodResolver(orderInsertSchema),
        defaultValues: {
            contactNumber: defaultValues.phoneNumber ?? "",
            region: defaultValues?.region ?? "",
            city: defaultValues?.city ?? "",
            address: defaultValues?.address ?? "",
            userId: defaultValues.id,
        },
    });

    const onSubmit: SubmitHandler<IOrderInsert> = async (value) => {
        const res = await submitCheckout(cart, {
            ...value,
            totalAmount: summary?.totalPrice,
        });
        if (!res.success) {
            toast({
                title: "Checkout Failed",
                description: res.cause.reason,
                variant: "destructive",
            });
        }
        toast({
            title: "Checkout Success",
        });
        emptyCart();
        await queryClient.invalidateQueries({
            queryKey: ["orders"],
        });
        router.replace("/profile/orders");
    };

    const region = form.watch("region");

    return (
        <div>
            <h2 className={"mb-4 font-bold text-2xl"}>
                Please Provide Deliver Information
            </h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name={"address"}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className={"mb-8"}>
                                <FormLabel>Address</FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Input {...field} placeholder={"Address"} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name={"region"}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className={"mb-8"}>
                                <FormLabel className={"sr-only"}>
                                    State/ Division
                                </FormLabel>
                                <FormMessage />
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl className={"py-2"}>
                                        <SelectTrigger
                                            className={"pb-7 pt-9 relative"}
                                        >
                                            <span
                                                className={
                                                    "absolute top-1 left-3.5 text-xs"
                                                }
                                            >
                                                State/Division
                                            </span>
                                            <SelectValue
                                                placeholder={"State/Division"}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {REGION.map((item) => (
                                            <SelectItem value={item} key={item}>
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name={"city"}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className={"mb-8"}>
                                <FormLabel className={"sr-only"}>
                                    TownShip
                                </FormLabel>
                                <FormMessage />
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger
                                            className={cn(
                                                "relative",
                                                field.value && "pb-7 pt-9",
                                            )}
                                        >
                                            {field.value && (
                                                <span
                                                    className={
                                                        "absolute top-1 left-3.5 text-xs"
                                                    }
                                                >
                                                    Township
                                                </span>
                                            )}
                                            <SelectValue
                                                placeholder={"Township"}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {TOWNSHIPS[region]?.map((item) => (
                                            <SelectItem value={item} key={item}>
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name={"contactNumber"}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className={"mb-8"}>
                                <FormLabel>Contact Phone Number</FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder={"Contact Phone Number"}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button
                        className={"mt-4 w-full"}
                        type={"submit"}
                        disabled={
                            form.formState.isSubmitting ||
                            !form.formState.isValid ||
                            !cart ||
                            !cart.length
                        }
                    >
                        {form.formState.isSubmitting ? (
                            <>
                                <Loader2
                                    className={"mr-2 inline-block animate-spin"}
                                />
                                <span>Checking Out...</span>
                            </>
                        ) : (
                            <span>Checkout</span>
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CheckoutForm;
