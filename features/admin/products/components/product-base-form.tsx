import { SubmitHandler, UseFormReturn } from "react-hook-form";

import { ProductInsertSchema } from "@/database/schema";

type ProductBaseFormProps = {
    form: UseFormReturn<ProductInsertSchema, unknown, undefined>;
    onSubmit: SubmitHandler<ProductInsertSchema>;
    mode: "EDIT" | "NEW";
};
const ProductBaseForm = () => {
    return <div></div>;
};

export default ProductBaseForm;
