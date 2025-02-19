"use client";
import {
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import DataTableBody from "@/components/share/admin/data-table-body";
import DataTableSkeleton from "@/components/share/admin/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { columns } from "@/features/admin/complain/columns/complains-columns";
import { useGetComplains } from "@/features/admin/complain/hooks/use-get-complains";

const ComplainsTable = () => {
    const { data } = useGetComplains();
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });

    const table = useReactTable({
        data: data ?? [],
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination,
        },
    });

    console.log(data);
    return (
        <div className={"p-6 bg-background rounded-2xl relative"}>
            <div>
                {!data && <DataTableSkeleton paginationOn={true} />}
                {data && <DataTableBody table={table} data={data ?? []} />}
                {data && (
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
                )}
            </div>
        </div>
    );
};

export default ComplainsTable;
