import { useQuery } from "@tanstack/react-query";

import { getDeliveries } from "@/features/admin/delivery/actions/get-deliveries";

export const useGetDeliveries = (driverId?: string) => {
    return useQuery({
        queryKey: ["deliveries", driverId ? { driverId } : "all"],
        queryFn: () => getDeliveries(driverId),
        staleTime: 60 * 60 * 1000,
    });
};
