"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

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
import { restockProduct } from "@/features/admin/products/actions/restock-product";
import { useRestockDialog } from "@/features/admin/products/hooks/use-restock-dialog";
import { useToast } from "@/hooks/use-toast";

type RestockProductFormProps = {
    variants: {
        productId: string;
        colorHex: string;
        stock: number;
    }[];
};

const restockSchema = z.object({
    productId: z.string(),
    quantity: z.coerce
        .number()
        .min(1, { message: "quantity must be at least 1" })
        .max(100, { message: "quantity must be at most 100" }),
});

type RestockProductSchema = Zod.infer<typeof restockSchema>;

export const RestockProductForm = ({ variants }: RestockProductFormProps) => {
    const form = useForm<RestockProductSchema>({
        resolver: zodResolver(restockSchema),
        defaultValues: {
            productId: "",
            quantity: 0,
        },
    });

    const { toast } = useToast();

    const router = useRouter();

    const onOpenChange = useRestockDialog((state) => state.onOpenChange);

    const onSubmit: SubmitHandler<RestockProductSchema> = async (value) => {
        const currentQuantity = variants.find(
            (item) => item.productId === value.productId,
        )!.stock;
        const res = await restockProduct(
            value.productId,
            currentQuantity + value.quantity,
        );
        if (!res.success) {
            return toast({
                title: "Restocking Product Failed",
                description: res.cause.reason,
                variant: "destructive",
            });
        }
        toast({
            title: "Product Successfully Restocked",
        });

        router.refresh();
        onOpenChange(false);
        return;
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    name={"productId"}
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className={"sr-only"}>
                                ProductId
                            </FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={"Color Variant"}
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {variants.map((variant, idx) => (
                                        <SelectItem
                                            value={variant.productId}
                                            key={variant.productId}
                                            className={
                                                "w-full flex items-center gap-x-4"
                                            }
                                        >
                                            <span>Color#{idx + 1}</span>
                                            <span
                                                aria-label={`color${variant.colorHex}`}
                                                className={
                                                    "block size-6 rounded-full"
                                                }
                                                style={{
                                                    backgroundColor: `${variant.colorHex}`,
                                                }}
                                            />
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <FormField
                    name={"quantity"}
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className={"mb-8"}>
                            <FormLabel>Quantity</FormLabel>
                            <FormMessage />
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder={"Quantity"}
                                    type={"number"}
                                    min={0}
                                    max={100}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button
                    className={"mt-4 w-full"}
                    type={"submit"}
                    disabled={
                        form.formState.isSubmitting || !form.formState.isValid
                    }
                >
                    {form.formState.isSubmitting ? (
                        <>
                            <Loader2
                                className={"mr-2 inline-block animate-spin"}
                            />
                            <span>Updating Stock...</span>
                        </>
                    ) : (
                        <span>Update Stock</span>
                    )}
                </Button>
            </form>
        </Form>
    );
};
