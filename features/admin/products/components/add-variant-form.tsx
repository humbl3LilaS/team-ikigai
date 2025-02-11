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
import { addNewVariant } from "@/features/admin/products/actions/add-new-variant";
import ColorPicker from "@/features/admin/products/components/color-picker";
import { useAddVariantDialog } from "@/features/admin/products/hooks/use-add-variant-dialog";
import { useGetWarehouses } from "@/features/admin/warehouses/hooks/use-get-warehouses";
import { useToast } from "@/hooks/use-toast";

const addVariantSchema = z.object({
    colorHex: z.string().min(7),
    quantity: z.coerce
        .number()
        .min(1, { message: "quantity must be at least 1" })
        .max(100, { message: "quantity must be at most 100" }),
    warehouseId: z.string().min(1),
});

type AddVariantSchema = Zod.infer<typeof addVariantSchema>;
const AddVariantForm = ({ detailId }: { detailId: string }) => {
    const form = useForm<AddVariantSchema>({
        resolver: zodResolver(addVariantSchema),
        defaultValues: {
            colorHex: "",
            quantity: 0,
            warehouseId: "",
        },
    });

    const { data: warehouses, isLoading } = useGetWarehouses();
    const { toast } = useToast();
    const router = useRouter();
    const onOpenChange = useAddVariantDialog((state) => state.onOpenChange);

    const onSubmit: SubmitHandler<AddVariantSchema> = async ({
        colorHex,
        quantity,
        warehouseId,
    }) => {
        const res = await addNewVariant({
            detailId,
            colorHex,
            quantity,
            warehouseId,
        });
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
                    control={form.control}
                    name={"colorHex"}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel
                                className={
                                    "text-base font-normal text-dark-500"
                                }
                            >
                                Variant Color
                            </FormLabel>
                            <FormControl>
                                <ColorPicker
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
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
                <FormField
                    name={"warehouseId"}
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className={"sr-only"}>
                                WarehouseId
                            </FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger disabled={isLoading}>
                                        <SelectValue
                                            placeholder={"Select Warehouse"}
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {warehouses &&
                                        warehouses.map((item, idx) => (
                                            <SelectItem
                                                value={item.id}
                                                key={item.id}
                                                className={
                                                    "w-full flex items-center gap-x-4"
                                                }
                                            >
                                                <span>Warehouse#{idx + 1}</span>
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
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
                            <span>Adding New Variant...</span>
                        </>
                    ) : (
                        <span>Add Variant</span>
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default AddVariantForm;
