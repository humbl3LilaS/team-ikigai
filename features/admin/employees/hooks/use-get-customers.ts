import { useQuery } from "@tanstack/react-query";

import { getEmployees } from "../actions/get-employees";


export const useGetEmployees = () => {
    return useQuery({
        queryKey: ["employees"],
        queryFn: getEmployees,
        staleTime: 60 * 60 * 1000,
    });
};
