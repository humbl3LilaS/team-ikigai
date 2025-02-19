"use client";
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import DataTableBody from "@/components/share/admin/data-table-body";
import DataTableSkeleton from "@/components/share/admin/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CustomersColumns } from "../columns/employees-column";
import { useGetEmployees } from "../hooks/use-get-customers";

const EmployeesTable = () => {
    const { data: employees } = useGetEmployees();
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 15,
    });

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data: employees ?? [],
        columns: CustomersColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        state: {
            pagination,
            sorting,
            columnFilters,
        },
    });

    return (
        <div className={"p-6 bg-background rounded-2xl relative"}>
            <div>
                {employees && (
                    <div className={"mb-4"}>
                        <Input
                            placeholder={`Filter by email...`}
                            value={
                                (table
                                    .getColumn("email")
                                    ?.getFilterValue() as string) ?? ""
                            }
                            onChange={(event) =>
                                table
                                    .getColumn("email")
                                    ?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm ml-auto"
                        />
                    </div>
                )}
                {!employees && <DataTableSkeleton paginationOn={true} />}
                {employees && (
                    <DataTableBody table={table} data={employees ?? []} />
                )}
                {employees && (
                    <div className="flex items-center justify-between space-x-2 py-4">
                        <p className={"text-foreground text-sm font-semibold"}>
                            Page {pagination.pageIndex + 1} of{" "}
                            {table.getPageCount()}
                        </p>
                        <div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    table.previousPage();
                                }}
                                disabled={!table.getCanPreviousPage()}
                                className={"mr-2"}
                            >
                                <ChevronLeft />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    table.nextPage();
                                }}
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

export default EmployeesTable;
