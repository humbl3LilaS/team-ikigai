import { useQuery } from "@tanstack/react-query";

import { getSaleReports } from "../actions/get-sale-reports";

export const useGetSaleReports = (date:string) => {
    return useQuery({
        queryKey: ["reports", {date}],
        queryFn: () => getSaleReports(date),
        staleTime: 30 * 60 * 1000,
    });
};
