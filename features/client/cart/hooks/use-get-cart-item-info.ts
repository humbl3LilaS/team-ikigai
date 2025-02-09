import { useQuery } from "@tanstack/react-query";

import { getCartItemInfo } from "@/features/client/cart/actions/get-cart-item-info";

export const useGetCartItemInfo = (pid: string, cid: string) => {
    return useQuery({
        queryKey: ["cart-item", pid, cid],
        queryFn: () => getCartItemInfo(pid, cid),
        enabled: !!pid && !!cid,
    });
};
