import { useQuery } from "@tanstack/react-query";

import { getCustomers } from "@/dashboard/actions";

export const useGetCustomers = () => {
    return useQuery({
        queryKey: ["customers"],
        queryFn: getCustomers,
        staleTime: 60 * 60 * 1000,
    });
};
