import { useQuery } from "@tanstack/react-query";

import { getCartSummary } from "@/features/client/cart/actions/get-cart-summary";

export const useGetCartSummaryInfo = (pids: string[]) => {
    return useQuery({
        queryKey: ["cart-summary"],
        queryFn: () => getCartSummary(pids),
        enabled: !!pids.length && !!pids.length,
        staleTime: 60 * 60 * 1000,
    });
};
