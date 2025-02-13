"use client";
import { createColumnHelper } from "@tanstack/table-core";
import Link from "next/link";
type TComplains = {
    id: string,
    orderItemId: string,
    type: string,
    issues: string,
    status: string,
    reason: string,
}
export const COMPLAIN_PLACEHOLDER: TComplains[] = [
    {
        id: "553224213131",
        orderItemId: "214421",
        type: "RETURN",
        issues: "Wrong order",
        status: "Pending",
        reason: "Wrong color product",
    },
    {
        id: "2342243252",
        orderItemId: "34532623",
        type: "FIX",
        issues: "CPU error",
        status: "Processing",
        reason: "CPU does not work",
    },
    {
        id: "435325325324532",
        orderItemId: "725445322",
        type: "RETURN",
        issues: "Wrong order",
        status: "Pending",
        reason: "Wrong color product",
    },
    {
        id: "435326234632362",
        orderItemId: "2462273432",
        type: "REFUND",
        issues: "Error in the product",
        status: "Pending",
        reason: "Error product",
    },
    {
        id: "75324532532325",
        orderItemId: "2634632",
        type: "REFUND",
        issues: "Wrong order",
        status: "Pending",
        reason: "Does not like the actual product.",
    },
]
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
        header: () => <span>Name</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("status", {
        header: () => <span>Status</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("reason", {
        header: () => <span>Reason</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    })
];