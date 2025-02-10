import { useQuery } from "@tanstack/react-query";

import { getInvoices } from "@/features/admin/invoice/actions/get-invoices";

export const useGetInvoices = () => {
    return useQuery({
        queryKey: ["invoices"],
        queryFn: getInvoices,
        staleTime: 60 * 60 * 1000,
    });
};
