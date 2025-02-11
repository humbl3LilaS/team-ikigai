"use client";
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
import { ProductInsertSchema, TProductInsertSchema } from "@/database/schema";
import { uploadNewProduct } from "@/features/admin/products/actions/upload-new-product";
import CoverImageUploader from "@/features/admin/products/components/cover-image-uploader";
import ProductFormBase from "@/features/admin/products/components/product-form-base";
import { useToast } from "@/hooks/use-toast";

const NewProductForm = () => {
    const form = useForm<TProductInsertSchema>({
        resolver: zodResolver(ProductInsertSchema),
        defaultValues: {
            name: "",
            discount: undefined,
            brand: "",
            price: 0,
            category: undefined,
            description: "",
            image: null,
            warehouseId: undefined,
            stock: 0,
        },
    });

    const { toast } = useToast();
    const router = useRouter();

    const onSubmit: SubmitHandler<TProductInsertSchema> = async (value) => {
        const res = await uploadNewProduct(value);
        if (!res.success) {
            return toast({
                title: "Failed To Create New Product",
                description: res.cause.reason,
                variant: "destructive",
            });
        }
        toast({
            title: "Successfully Created New Product",
        });
        return router.push(`/admin/products/${res.newProductId}`);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    name={"image"}
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className={"col-span-2"}>
                            <FormLabel className={"sr-only"}>
                                ProductImage
                            </FormLabel>
                            <FormMessage />
                            <FormControl>
                                <CoverImageUploader
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <ProductFormBase form={form} />

                <Button
                    className={"mt-4 w-48"}
                    type={"submit"}
                    disabled={
                        form.formState.isSubmitting || !form.formState.isValid
                    }
                >
                    {form.formState.isSubmitting ? (
                        <>
                            <Loader2 className="animate-spin" />
                            <span>Submitting</span>
                        </>
                    ) : (
                        <span>Submit</span>
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default NewProductForm;
