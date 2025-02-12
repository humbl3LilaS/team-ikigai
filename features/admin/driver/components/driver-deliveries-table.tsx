"use client"
import {
    getCoreRowModel,
    getPaginationRowModel,
    PaginationState,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import DataTableBody from "@/components/share/admin/data-table-body";
import { Button } from "@/components/ui/button";
import {
    columns,
    DRIVER_DELIVERIES_DETAILS_PLACEHOLDER,
} from "@/features/admin/driver/columns/driver-deliveries-details-columns";
const DriverDeliveriesTable = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5
    })
    const table = useReactTable({
        data: DRIVER_DELIVERIES_DETAILS_PLACEHOLDER,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination,
        },
    });
    return (
        <div className="bg-background block">
            <div>
                <DataTableBody table={table} data={DRIVER_DELIVERIES_DETAILS_PLACEHOLDER} />
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 md:space-x-2 py-4">
                    <p className="text-foreground text-sm font-semibold">
                        Page {pagination.pageIndex + 1} of {table.getPageCount()}
                    </p>
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
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
    )
}
export default DriverDeliveriesTable;