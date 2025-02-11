import { useQuery } from "@tanstack/react-query";

import { getWarehouses } from "@/features/admin/warehouses/actions/get-warehouses";

export const useGetWarehouses = () => {
    return useQuery({
        queryKey: ["warehouses"],
        queryFn: getWarehouses,
        staleTime: 60 * 60 * 1000,
    });
};
