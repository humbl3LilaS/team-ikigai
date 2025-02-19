"use client";
import { createColumnHelper } from "@tanstack/table-core";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import ComplainTableActionBtn from "@/features/admin/complain/components/complain-table-action-btn";

import { TComplains } from "../actions/get-complains";
import ComplainsStatus from "../components/complains-status";

const columnHelper = createColumnHelper<TComplains>();
export const columns = [
    columnHelper.accessor("id", {
        header: () => <span>ID</span>,
        cell: ({ getValue, row }) => (
            <Link
                href={`complains/${row.original.id}`}
                className={
                    "max-w-[200px] line-clamp-1 underline hover:text-blue-500"
                }
            >
                {getValue()}
            </Link>
        ),
    }),
    columnHelper.accessor("orderItemId", {
        header: () => <span>Order Item ID</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("createdAt", {
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Category
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ getValue }) => (
            <span>{format(getValue(), "do MMM yyyy")}</span>
        ),
    }),
    columnHelper.accessor("type", {
        header: () => <span>Type</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("status", {
        header: () => <span>Status</span>,
        cell: ({ getValue }) => <ComplainsStatus status={getValue()} />,
    }),

    columnHelper.accessor("issues", {
        header: () => <span></span>,
        cell: ({ row }) => <ComplainTableActionBtn data={row.original} />,
    }),
];
