import { useQuery } from "@tanstack/react-query";

import { getDeliveries } from "@/features/admin/delivery/actions/get-deliveries";

export const useGetDeliveries = () => {
    return useQuery({
        queryKey: ["deliveries"],
        queryFn: getDeliveries,
        staleTime: 60 * 60 * 1000,
    });
};
