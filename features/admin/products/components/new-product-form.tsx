"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { ProductInsertSchema, TProductInsertSchema } from "@/database/schema";
import ProductFromBase from "@/features/admin/products/components/product-from-base";

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
        },
    });

    const onSubmit: SubmitHandler<TProductInsertSchema> = (value) => {
        console.log(value);
    };

    return <ProductFromBase form={form} onSubmit={onSubmit} mode={"new"} />;
};

export default NewProductForm;
