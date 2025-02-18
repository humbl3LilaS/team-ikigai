import { useQuery } from "@tanstack/react-query";

import { IOrderStatus } from "@/database/schema";
import { getOrdersByUserId } from "@/features/client/user/actions/get-orders-by-user-id";

export const useGetOrdersByUserId = (userId: string, status?: IOrderStatus) => {
    return useQuery({
        queryKey: ["orders", { userId }, status && { status }],
        queryFn: () => getOrdersByUserId(userId, status),
        staleTime: 60 * 10 * 1000,
        enabled: !!userId,
    });
};
