"use client";

import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";

import { TOrderInfo } from "@/features/admin/order/actions/get-orders";
import { cn } from "@/lib/utils";

const columnHelper = createColumnHelper<TOrderInfo>();
import { format } from "date-fns";

export const orderColumns = [
    columnHelper.accessor("id", {
        header: () => <span>ID</span>,
        cell: ({ getValue, row }) => (
            <Link className={"max-w-[200px] line-clamp-1"}
                href={`orders/${getValue()}`}>
                {row.original.id}
            </Link>
        ),
    }),
    columnHelper.accessor("userId", {
        header: () => <span>User</span>,
        cell: ({ getValue, row }) => (
            <Link
                className={"max-w-[200px] line-clamp-1"}
                href={`/admin/customers/${getValue()}`}
            >
                {row.original.username}
            </Link>
        ),
    }),
    columnHelper.accessor("totalAmount", {
        header: () => <span>Total Amount</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
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
    columnHelper.accessor("status", {
        header: () => <span>Status</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1 text-xs"}>
                <span
                    className={cn(
                        "font-medium px-1 py-0.5 rounded-sm",
                        getValue() === "CANCEL"
                            ? "admin-cancel-status"
                            : getValue() === "ON_THE_WAY"
                                ? "admin-ontheway-status"
                                : getValue() === "PENDING"
                                    ? "admin-pending-status"
                                    : getValue() === "FINISH"
                                        ? "admin-finish-status"
                                        : "admin-approve-status",
                    )}
                >
                    {getValue()}
                </span>
            </span>
        ),
    }),
];
