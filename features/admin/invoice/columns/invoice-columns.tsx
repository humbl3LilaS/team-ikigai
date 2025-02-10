"use client";

import { createColumnHelper } from "@tanstack/table-core";

type TInvoice = {
    id: string,
    orderId: string,
    userId: string,
    status: string,
    payment_method: string
};

export const INVOICE_PLACEHOLDER: TInvoice[] = [
    {
        id: "1",
        orderId: "3",
        userId: "5",
        status: "Pending",
        payment_method: "1",
    },
    {
        id: "2",
        orderId: "3",
        userId: "2",
        status: "Accept",
        payment_method: "3",
    },
    {
        id: "3",
        orderId: "6",
        userId: "5",
        status: "Pending",
        payment_method: "1",
    },
    {
        id: "4",
        orderId: "7",
        userId: "2",
        status: "Accept",
        payment_method: "5",
    },
    {
        id: "5",
        orderId: "9",
        userId: "3",
        status: "Pending",
        payment_method: "6",
    },
];

const columnHelper = createColumnHelper<TInvoice>();

export const columns = [
    columnHelper.accessor("id", {
        header: () => <span>ID</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("orderId", {
        header: () => <span>Order ID</span>,
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
    columnHelper.accessor("status", {
        header: () => <span>Status</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("payment_method", {
        header: () => <span>Payment Method</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
];