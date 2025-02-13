import { useQuery } from "@tanstack/react-query";

import { getComplains } from "@/features/client/user/complains/actions/get-complains";

export const useGetComplains = () => {
    return useQuery({
        queryKey: ["complains"],
        queryFn: getComplains,
        staleTime: 60 * 10 * 1000,
    });
};
