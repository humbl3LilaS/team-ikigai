import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { dispatchDelivery } from "@/features/admin/orders/actions/diaptch-delivery";

export const useDispatchDelivery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: { driver: string; orderId: string }) =>
            dispatchDelivery(payload),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["orders"],
            });
            await queryClient.invalidateQueries({
                queryKey: ["deliveries"],
            });
            toast.success("Successfully Dispatch the order");
        },
        onError: async () => {
            toast.error("Error during the dispatch");
        },
    });
};
