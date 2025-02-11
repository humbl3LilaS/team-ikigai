import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";
import { PRODUCT_CATEGORY } from "@/constants";
import { ProductUpdateSchema, TProductUpdateSchema } from "@/database/schema";
import { updateProductById } from "@/features/admin/products/actions/update-product-by-id";
import { useUpdateProductSheet } from "@/features/admin/products/hooks/use-update-product-sheet";
import { useToast } from "@/hooks/use-toast";
import { getDirtyField } from "@/lib/utils";

const UpdateProductForm = ({
    defaultValues,
    onDelete,
    isDeleting,
}: {
    defaultValues: TProductUpdateSchema;
    onDelete: () => void;
    isDeleting: boolean;
}) => {
    const form = useForm<TProductUpdateSchema>({
        resolver: zodResolver(ProductUpdateSchema),
        defaultValues: { ...defaultValues },
    });
    const onOpenChange = useUpdateProductSheet((state) => state.onOpenChange);

    const { toast } = useToast();
    const router = useRouter();

    const onSubmit: SubmitHandler<TProductUpdateSchema> = async (values) => {
        const dirtyFields = getDirtyField(values, form.formState.dirtyFields);
        const res = await updateProductById(defaultValues.id!, dirtyFields);
        if (!res.success) {
            return toast({
                title: "Failed To Update The product",
                description: res.cause.reason,
                variant: "destructive",
            });
        }
        toast({
            title: "Successfully Updated Product",
        });

        router.refresh();
        onOpenChange(false);
        return;
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={"overflow-y-scroll"}
            >
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
                <div>
                    <Button
                        type={"button"}
                        className={"bg-red-600 text-white"}
                        onClick={onDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 className={"animate-spin"} />
                                <span>Deleting</span>
                            </>
                        ) : (
                            <span>Delete</span>
                        )}
                    </Button>
                    <Button
                        className={"mt-4 ml-4"}
                        type={"submit"}
                        disabled={
                            form.formState.isSubmitting ||
                            !form.formState.isValid ||
                            !form.formState.isDirty ||
                            isDeleting
                        }
                    >
                        {form.formState.isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin" />
                                <span>Updating</span>
                            </>
                        ) : (
                            <span>Update</span>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default UpdateProductForm;
