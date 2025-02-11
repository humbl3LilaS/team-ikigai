"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { productInsertSchema, ProductInsertSchema } from "@/database/schema";

export const NewProductForm = () => {
    const form = useForm<ProductInsertSchema>({
        resolver: zodResolver(productInsertSchema),
        defaultValues: {},
    });
    return <div></div>;
};
