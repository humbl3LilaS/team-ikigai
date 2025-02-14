import { useQuery } from "@tanstack/react-query";

import { getComplains } from "@/features/admin/complain/actions/get-complains";

export const useGetComplains = () => {
    return useQuery({
        queryKey: ["complains"],
        queryFn: getComplains,
        staleTime: 60 * 60 * 1000,
    });
}