import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
    exchangeFaultyProduct,
    ExchangeFaultyProductPayload,
} from "@/features/admin/complain/actions/exchange-faulty-product";

export const useExchangeFaultyProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: ExchangeFaultyProductPayload) =>
            exchangeFaultyProduct(payload),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["complains"],
            });
            await queryClient.invalidateQueries({
                queryKey: ["deliveries"],
            });
            toast.success(
                "Successfully dispatched driver to exchange faulty product",
            );
        },
        onError: () => {
            toast.error("Error dispatching driver to exchange faulty product");
        },
    });
};
