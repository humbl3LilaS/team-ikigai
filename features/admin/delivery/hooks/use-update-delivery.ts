import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
    updateDelivery,
    UpdateDeliveryPayload,
} from "@/features/admin/delivery/actions/update-delivery";

export const useUpdateDelivery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: UpdateDeliveryPayload) => updateDelivery(payload),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["deliveries"],
            });
            toast.success(`Delivery Successfully Updated`);
        },
        onError: () => {
            toast.error("Error Updating Delivery");
        },
    });
};
