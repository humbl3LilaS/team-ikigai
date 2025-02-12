import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteProductById } from "@/features/admin/products/actions/delete-product-by-id";

export const useDeleteProductById = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => deleteProductById(id),
        onSuccess: async () => {
            toast.success("Product deleted successfully.");
            await queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
        onError: async (error) => {
            toast.error(error.message);
        },
    });
};
