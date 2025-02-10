"use client";
import {
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { InferSelectModel } from "drizzle-orm";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import DataTableBody from "@/components/share/admin/data-table-body";
import { Button } from "@/components/ui/button";
import { getCustomers } from "@/dashboard/actions";
import { users } from "@/database/schema";

import { CustomersColumns } from "../columns/customers-columns";

const CustomersTable = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 15,
    });

    type TCustomers = InferSelectModel<typeof users>;
    const [dbCustomers, setDbCustomers] = useState<TCustomers[]>([]);
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data: dbCustomers,
        columns: CustomersColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            pagination,
            sorting,
        },
    });

    useEffect(() => {
        getCustomers().then( data => setDbCustomers(data));
    }, []);

    return (
        <div className={"p-6 bg-background rounded-2xl relative"}>
            <div>
                <DataTableBody table={table} data={dbCustomers} />
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

export default CustomersTable;
