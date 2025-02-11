"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { ProductInsertSchema, TProductInsertSchema } from "@/database/schema";
import { uploadNewProduct } from "@/features/admin/products/actions/upload-new-product";
import ProductFromBase from "@/features/admin/products/components/product-from-base";
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

    return <ProductFromBase form={form} onSubmit={onSubmit} mode={"new"} />;
};

export default NewProductForm;
