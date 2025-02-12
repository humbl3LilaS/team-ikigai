"use client";

import { createColumnHelper } from "@tanstack/table-core";
import Link from "next/link";

import { TInvoiceInfo } from "@/features/admin/invoices/actions/get-invoices";
import PaymentMethod from "@/features/admin/invoices/components/payment-method";

const columnHelper = createColumnHelper<TInvoiceInfo>();

export const columns = [
    columnHelper.accessor("id", {
        header: () => <span>ID</span>,
        cell: ({ getValue }) => (
            <Link
                href={`/admin/invoices/${getValue()}`}
                className={"max-w-[200px] line-clamp-1"}
            >
                {getValue()}
            </Link>
        ),
    }),
    columnHelper.accessor("orderId", {
        header: () => <span>Order ID</span>,
        cell: ({ getValue }) => (
            <Link
                href={`/admin/orders/${getValue()}`}
                className={"max-w-[150px] line-clamp-1"}
            >
                {getValue()}
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
        header: () => <span>Amount</span>,
        cell: ({ getValue }) => (
            <p className={"flex gap-x-1 items-baseline"}>
                <span className={"font-semibold text-xs"}>$</span>
                <span className={" line-clamp-1 font-bold "}>{getValue()}</span>
            </p>
        ),
    }),
    columnHelper.accessor("paymentMethod", {
        header: () => <span>Payment Method</span>,
        cell: ({ getValue }) => <PaymentMethod method={getValue()} />,
    }),
];
