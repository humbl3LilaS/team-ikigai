import { useQuery } from "@tanstack/react-query";

import { getDrivers } from "@/features/admin/driver/actions/get-drivers";

export const useGetDrivers = () => {
    return useQuery({
        queryKey: ["drivers"],
        queryFn: getDrivers,
        staleTime: 60 * 60 * 1000,
    });
};
