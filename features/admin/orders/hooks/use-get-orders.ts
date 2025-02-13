import { useQuery } from "@tanstack/react-query";

import { IOrderStatus } from "@/database/schema";
import { getOrders } from "@/features/admin/orders/actions/get-orders";

export const useGetOrders = (status?: IOrderStatus) => {
    return useQuery({
        queryKey: ["orders", status ?? "all"],
        queryFn: () => getOrders(status),
        staleTime: 60 * 60 * 1000,
    });
};
