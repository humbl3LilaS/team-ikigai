"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";

import { IOrderStatus } from "@/database/schema";
import { TOrderInfo } from "@/features/admin/orders/actions/get-orders";
import OrderTableActionBtn from "@/features/admin/orders/components/order-table-action-btn";
import { cn } from "@/lib/utils";

const columnHelper = createColumnHelper<TOrderInfo>();

const getOrderStatusClass = (status: string): string => {
    switch (status) {
        case "CANCEL":
            return "admin-cancel-status";
        case "ON_THE_WAY":
            return "admin-ontheway-status";
        case "PENDING":
            return "admin-pending-status";
        case "FINISH":
            return "admin-finish-status";
        default:
            return "admin-approve-status";
    }
};
export const orderColumns = [
    columnHelper.accessor("id", {
        header: () => <span>ID</span>,
        cell: ({ getValue }) => (
            <Link
                href={`/admin/orders/${getValue()}`}
                className={"max-w-[200px] line-clamp-1"}
            >
                {getValue()}
            </Link>
        ),
    }),
    columnHelper.accessor("createdAt", {
        header: () => <span>Order Date</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>
                {format(getValue(), "do MMM yyyy")}
            </span>
        ),
    }),
    columnHelper.accessor("username", {
        header: () => <span>User</span>,
        cell: ({ getValue, row }) => (
            <Link
                className={"max-w-[200px] line-clamp-1"}
                href={`/admin/customers/${row.original.userId}`}
            >
                {getValue()}
            </Link>
        ),
    }),
    columnHelper.accessor("contactNumber", {
        header: () => <span>Phone</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("address", {
        header: () => <span>Address</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("city", {
        header: () => <span>City</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("totalAmount", {
        header: () => <span>Total Amount</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] tabular-nums text-right line-clamp-1"}>${getValue().toLocaleString()}</span>
        ),
    }),

    columnHelper.accessor("status", {
        header: () => <span>Status</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1 text-xs"}>
                <span
                    className={cn(
                        "font-medium px-1 py-0.5 rounded-sm",
                        getOrderStatusClass(getValue()),
                    )}
                >
                    {getValue()}
                </span>
            </span>
        ),
    }),
    columnHelper.accessor("userId", {
        header: () => <span className={"sr-only"}>Action Button List</span>,
        cell: ({ row }) => {
            const notAllowed: IOrderStatus[] = [
                "CANCEL",
                "FINISH",
                "ON_THE_WAY",
            ];

            if (notAllowed.includes(row.original.status)) {
                return <></>;
            }
            return (
                <OrderTableActionBtn
                    orderId={row.original.id}
                    status={row.original.status}
                />
            );
        },
    }),
];
