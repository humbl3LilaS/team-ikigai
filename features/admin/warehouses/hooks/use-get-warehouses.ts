import { useQuery } from "@tanstack/react-query";

import { getProductByWareHouseId, getWarehouses } from "@/features/admin/warehouses/actions/get-warehouses";

export const useGetWarehouses = () => {
    return useQuery({
        queryKey: ["warehouses"],
        queryFn: getWarehouses,
        staleTime: 60 * 60 * 1000,
    });
};

export const useGetProductByWareHouseId = (id:string)=>{
    return useQuery({
        queryKey:["products",id],
        queryFn:()=>getProductByWareHouseId(id),
        staleTime:60 * 60 * 1000,
        enabled: !!id,
    })
}