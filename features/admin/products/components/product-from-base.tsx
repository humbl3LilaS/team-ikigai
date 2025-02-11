"use client";
import { Loader2 } from "lucide-react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

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
import { Textarea } from "@/components/ui/textarea";
import { PRODUCT_CATEGORY } from "@/constants";
import { TProductInsertSchema } from "@/database/schema";
import ColorPicker from "@/features/admin/products/components/color-picker";

type ProductFormBaseProps = {
    form: UseFormReturn<TProductInsertSchema, unknown, undefined>;
    onSubmit: SubmitHandler<TProductInsertSchema>;
    mode?: "edit" | "new";
};
const ProductFromBase = ({ form, onSubmit, mode }: ProductFormBaseProps) => {
    const disable =
        !form.formState.isValid ||
        form.formState.isSubmitting ||
        (mode === "edit" && !form.formState.isDirty);
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    name={"name"}
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder={"Product Name..."}
                                />
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
                            <FormLabel>Description</FormLabel>
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
                            <FormLabel>Product Label</FormLabel>
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

                <Button
                    className={"mt-4 w-48"}
                    type={"submit"}
                    disabled={disable}
                >
                    {form.formState.isSubmitting ? (
                        <>
                            <Loader2 className="animate-spin" />
                            <span>
                                {mode === "new" ? "Submitting" : "Editing"}
                            </span>
                        </>
                    ) : (
                        <span>Submit</span>
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default ProductFromBase;
