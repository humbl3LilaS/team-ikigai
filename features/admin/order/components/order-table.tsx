"use client";
import {
    getCoreRowModel,
    getPaginationRowModel,
    PaginationState,
    useReactTable,
} from "@tanstack/react-table";
import { InferSelectModel } from "drizzle-orm";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import DataTableBody from "@/components/share/admin/data-table-body";
import { Button } from "@/components/ui/button";
import { getOrders } from "@/dashboard/actions";
import { orders } from "@/database/schema";
import {
    orderColumns,
} from "@/features/admin/order/columns/order-columns";

const OrderTable = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    type TOrder = InferSelectModel<typeof orders>;
    const [dbOrders, setDbOrders] = useState<TOrder[]>([]);

    const table = useReactTable({
        data: dbOrders,
        columns: orderColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination,
        },
    });

    useEffect(() => {
        getOrders().then(data => setDbOrders(data));
    }, []);

    return (
        <div className={"p-6 bg-background rounded-2xl relative"}>
            <div>
                <DataTableBody table={table} data={dbOrders} />
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

export default OrderTable;
