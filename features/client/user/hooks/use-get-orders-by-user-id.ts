import { useQuery } from "@tanstack/react-query";

import { getOrdersByUserId } from "@/features/client/user/actions/get-orders-by-user-id";

export const useGetOrdersByUserId = (userId: string) => {
    return useQuery({
        queryKey: ["orders", { userId }],
        queryFn: () => getOrdersByUserId(userId),
        staleTime: 60 * 10 * 1000,
        enabled: !!userId,
    });
};
