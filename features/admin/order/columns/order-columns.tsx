"use client";

import { createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper();

import { cn } from "@/lib/utils";

export const orderColumns = [
    columnHelper.accessor("id", {
        header: () => <span>ID</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("userId", {
        header: () => <span>User ID</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("totalAmount", {
        header: () => <span>Date</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("status", {
        header: () => <span>Status</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1 text-xs"}>
                <span className={cn("font-medium px-1 py-0.5 rounded-sm",
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
