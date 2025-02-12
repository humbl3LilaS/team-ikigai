import { useQuery } from "@tanstack/react-query";

import { getOrderItemsByOrderId } from "@/features/client/user/actions/get-order-items-by-order-id";

export const useGetOrderItemsByOrderId = (orderId: string) => {
    return useQuery({
        queryKey: ["orderId", { orderId }],
        queryFn: () => getOrderItemsByOrderId(orderId),
        enabled: !!orderId,
        staleTime: 10 * 60 * 1000,
    });
};
