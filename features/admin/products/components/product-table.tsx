"use client";
import {
    getCoreRowModel,
    getPaginationRowModel,
    PaginationState,
    useReactTable,
} from "@tanstack/react-table";

import DataTableBody from "@/components/share/admin/data-table-body";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { D_ProductDetails } from "@/dummy";
import { columns} from "../columns/products-column";

const ProductsTable = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 15,
    });

    const table = useReactTable({
        data: D_ProductDetails,
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
                <DataTableBody table={table} data={D_ProductDetails} />
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

export default ProductsTable;
