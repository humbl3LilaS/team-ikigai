import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { IOrderStatus } from "@/database/schema";
import { changeOrderStatus } from "@/features/admin/orders/actions/change-order-status";

export const useChangeOrderStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: { orderId: string; payload: IOrderStatus }) =>
            changeOrderStatus(payload),
        onSuccess: async (_data, variables) => {
            await queryClient.invalidateQueries({
                queryKey: ["orders"],
            });
            toast.success(
                `Successfully Changed Order Status to ${variables.payload}`,
            );
        },
        onError: () => {
            toast.error("Error Changing Order Status");
        },
    });
};
