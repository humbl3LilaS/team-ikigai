import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { IComplain } from "@/database/schema";
import { updateComplain } from "@/features/admin/complain/actions/update-complain";
type Payload = {
    complainId: string;
    payload: Partial<IComplain>;
};
export const useUpdateComplain = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ complainId, payload }: Payload) =>
            updateComplain(complainId, payload),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["complains"],
            });
            toast.success("Complain successfully updated.");
        },
        onError: () => {
            toast.error("Error updating Complains Status");
        },
    });
};
