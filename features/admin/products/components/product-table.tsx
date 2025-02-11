"use client";
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    PaginationState,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import DataTableBody from "@/components/share/admin/data-table-body";
import DataTableSkeleton from "@/components/share/admin/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetProducts } from "@/features/admin/products/hooks/use-get-products";

import { columns } from "../columns/products-column";

const ProductsTable = () => {
    const { data: products } = useGetProducts();
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data: products ?? [],
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        state: {
            pagination,
            columnFilters,
        },
    });
    return (
        <div className={"p-6 bg-background rounded-2xl relative"}>
            {products && (
                <Link
                    href={"/admin/products/new"}
                    className={
                        "absolute px-3 py-1 bg-foreground rounded-lg text-background "
                    }
                >
                    Add New Product
                </Link>
            )}
            <div>
                {products && (
                    <div className={"mb-4"}>
                        <Input
                            placeholder={`Filter by name...`}
                            value={
                                (table
                                    .getColumn("name")
                                    ?.getFilterValue() as string) ?? ""
                            }
                            onChange={(event) =>
                                table
                                    .getColumn("name")
                                    ?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm ml-auto"
                        />
                    </div>
                )}
                {!products && <DataTableSkeleton paginationOn={true} />}
                {products && (
                    <DataTableBody table={table} data={products ?? []} />
                )}
                {products && (
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

export default ProductsTable;
