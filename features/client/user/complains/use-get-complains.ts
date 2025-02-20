import { useQuery } from "@tanstack/react-query";

import { getComplains } from "@/features/client/user/complains/actions/get-complains";

export const useGetComplains = (userId: string) => {
    return useQuery({
        queryKey: ["complains", { userId }],
        queryFn: () => getComplains(userId),
        staleTime: 60 * 10 * 1000,
        enabled: !!userId,
    });
};
