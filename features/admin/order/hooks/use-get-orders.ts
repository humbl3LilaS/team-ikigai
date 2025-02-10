import { useQuery } from "@tanstack/react-query";

import { getOrders } from "@/features/admin/order/actions/get-orders";

export const useGetOrders = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: getOrders,
        staleTime: 60 * 60 * 1000,
    });
};
