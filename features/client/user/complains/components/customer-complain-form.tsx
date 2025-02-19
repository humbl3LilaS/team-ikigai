"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { COMPLAIN_TYPE } from "@/database/schema";
import { fileComplain } from "@/features/client/user/complains/actions/file-complain";
import OrderItemSelector from "@/features/client/user/complains/components/order-item-selector";
import { useGetOrdersByUserId } from "@/features/client/user/hooks/use-get-orders-by-user-id";
import { useToast } from "@/hooks/use-toast";
import { ComplainFormSchema, TComplainFormSchema } from "@/validation";

const CustomerComplainForm = ({ userId }: { userId: string }) => {
    const form = useForm<TComplainFormSchema>({
        resolver: zodResolver(ComplainFormSchema),
        defaultValues: {
            issue: "",
            type: "",
            orderId: "",
            orderDetailsId: [],
        },
    });

    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { data: orders, isLoading } = useGetOrdersByUserId(userId, "FINISH");
    console.log(orders);
    const onSubmit: SubmitHandler<TComplainFormSchema> = async (values) => {
        const res = await fileComplain(values);
        if (!res.success) {
            return toast({
                title: "Failed To Create Complain",
                description: res.cause.reason,
                variant: "destructive",
            });
        }
        toast({
            title: "Complaint Successfully Filed",
        });
        await queryClient.invalidateQueries({
            queryKey: ["complains"],
        });
        form.reset();
    };
    const orderId = form.watch("orderId");

    useEffect(() => {
        form.setValue("orderDetailsId", []);
    }, [orderId, form.setValue]);

    return (
        <div className={"p-6 border border-black/50 rounded-lg"}>
            <h2 className={"mb-4 font-bold text-lg"}>File a Complain</h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={"flex flex-col gap-y-3"}
                >
                    <FormField
                        name={"orderId"}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select an order</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={isLoading}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={"Orders"}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {orders &&
                                            orders.map((order) => (
                                                <SelectItem
                                                    value={order.id}
                                                    key={order.id}
                                                    className={
                                                        "w-full flex items-center gap-x-4"
                                                    }
                                                >
                                                    <span>{order.id}</span>
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {orderId && (
                        <FormField
                            name={"orderDetailsId"}
                            control={form.control}
                            render={({ field }) => (
                                <OrderItemSelector
                                    orderId={orderId}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    )}

                    <FormField
                        name={"type"}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select a complain type</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={isLoading}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={"Complain type"}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {COMPLAIN_TYPE.enumValues.map(
                                            (type) => (
                                                <SelectItem
                                                    value={type}
                                                    key={type}
                                                    className={
                                                        "w-full flex items-center gap-x-4"
                                                    }
                                                >
                                                    <span>{type}</span>
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name={"issue"}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className={"col-span-2"}>
                                <FormLabel>
                                    What is wrong with this product
                                </FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder={
                                            "Detail about faulty or wrong product"
                                        }
                                        value={field.value}
                                        className={"h-[200px]"}
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
                            !form.formState.isValid
                        }
                    >
                        {form.formState.isSubmitting ? (
                            <>
                                <Loader2
                                    className={"mr-2 inline-block animate-spin"}
                                />
                                <span>Filing Complaint...</span>
                            </>
                        ) : (
                            <span>File Complaint</span>
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CustomerComplainForm;
