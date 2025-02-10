import { useQuery } from "@tanstack/react-query";

import { getProducts } from "@/features/admin/products/actions/get-products";

export const useGetProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
        staleTime: 60 * 60 * 1000,
    });
};
