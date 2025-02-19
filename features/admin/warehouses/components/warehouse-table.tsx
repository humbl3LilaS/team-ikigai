"use client";
import {
    getCoreRowModel,
    getPaginationRowModel,
    PaginationState,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import DataTableBody from "@/components/share/admin/data-table-body";
import DataTableSkeleton from "@/components/share/admin/data-table-skeleton";
import { Button } from "@/components/ui/button";
import {
    columns,
} from "@/features/admin/warehouses/columns/warehouse-column";

import { getWarehouses } from "../actions/get-warehouses";
import { TWarehouse } from "../actions/get-warehouses";
import { useGetWarehouses } from "../hooks/use-get-warehouses";



const WareHouseTable = () => {
    const { data } = useGetWarehouses();
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [_, setWareHouseData] = useState<TWarehouse[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getWarehouses();
            setWareHouseData(data as TWarehouse[]);
        };
        fetchData();
    }, []);
    // console.log(warehouseData);

    const table = useReactTable({
        data: data ?? [],
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination,
        },
    });
    return (
        <div className={"p-6 bg-background rounded-2xl relative"}>
            <div>
                {!data && <DataTableSkeleton paginationOn={true} />}
                {data && <DataTableBody table={table} data={data} />}
                <div className="flex items-center justify-between space-x-2 py-4">
                    <p className={"text-foreground text-sm font-semibold"}>
                        Page {pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </p>
                    <div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className={"mr-2"}
                        >
                            <ChevronLeft />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronRight />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default WareHouseTable;
