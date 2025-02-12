"use client";
import { UseFormReturn } from "react-hook-form";

import {
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
import { Textarea } from "@/components/ui/textarea";
import { PRODUCT_CATEGORY } from "@/constants";
import { TProductInsertSchema } from "@/database/schema";
import ColorPicker from "@/features/admin/products/components/color-picker";
import { useGetWarehouses } from "@/features/admin/warehouses/hooks/use-get-warehouses";

type ProductFormBaseProps = {
    form: UseFormReturn<TProductInsertSchema, unknown, undefined>;
};
const ProductFormBase = ({ form }: ProductFormBaseProps) => {
    const { data: warehouses, isLoading } = useGetWarehouses();
    return (
        <>
            <FormField
                name={"name"}
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder={"Product Name..."} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                name={"price"}
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                placeholder={"Price..."}
                                type={"number"}
                                min={0}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                name={"discount"}
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Discount</FormLabel>
                        <FormMessage />
                        <FormControl>
                            <Input
                                {...field}
                                placeholder={"Discount..."}
                                value={field.value ?? 0}
                                type={"number"}
                                min={0}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField
                name={"description"}
                control={form.control}
                render={({ field }) => (
                    <FormItem className={"col-span-2"}>
                        <FormLabel>Description</FormLabel>
                        <FormMessage />
                        <FormControl>
                            <Textarea
                                {...field}
                                placeholder={"Product Description..."}
                                value={field.value ?? 0}
                                className={"h-[200px]"}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />

            <FormField
                name={"colorHex"}
                control={form.control}
                render={({ field }) => (
                    <FormItem className={"col-span-2"}>
                        <FormLabel>Product Color</FormLabel>
                        <FormMessage />
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
                name={"category"}
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Product Category</FormLabel>
                        <FormMessage />
                        <Select onValueChange={field.onChange}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue
                                        placeholder={field.value}
                                        className={"placeholder:capitalize"}
                                    />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {PRODUCT_CATEGORY.map((item) => (
                                    <SelectItem
                                        value={item}
                                        key={item}
                                        className={"capitalize"}
                                    >
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                name={"brand"}
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Product Brand</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                placeholder={"Product Brand..."}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                name={"warehouseId"}
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>WarehouseId</FormLabel>
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
            <FormField
                name={"stock"}
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Product In Stock</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                placeholder={"Stock Qty..."}
                                type={"number"}
                                min={0}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                name={"detail"}
                control={form.control}
                render={({ field }) => (
                    <FormItem className={"col-span-2"}>
                        <FormLabel>Product Details</FormLabel>
                        <FormMessage />
                        <FormControl>
                            <Textarea
                                {...field}
                                placeholder={"Product Description..."}
                                value={field.value ?? 0}
                                className={"h-[200px]"}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
        </>
    );
};

export default ProductFormBase;
