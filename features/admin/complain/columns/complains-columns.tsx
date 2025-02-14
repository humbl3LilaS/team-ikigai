"use client";
import { createColumnHelper } from "@tanstack/table-core";
import Link from "next/link";
import { TComplains } from "../actions/get-complains";
import ComplainsStatus from "../components/complains-status";

const columnHelper = createColumnHelper<TComplains>();
export const columns = [
    columnHelper.accessor("id", {
        header: () => <span>ID</span>,
        cell: ({ getValue, row }) => (
            <Link
                href={`complains/${row.original.id}`}
                className={"max-w-[200px] line-clamp-1"}
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
    columnHelper.accessor("type", {
        header: () => <span>Type</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("issues", {
        header: () => <span>Issues</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("status", {
        header: () => <span>Status</span>,
        cell: ({ getValue }) => <ComplainsStatus status={getValue()} />,
    }),
    // columnHelper.accessor("reason", {
    //     header: () => <span>Reason</span>,
    //     cell: ({ getValue }) => (
    //         <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
    //     ),
    // }),
];
