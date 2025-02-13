"use client";

import { createColumnHelper } from "@tanstack/table-core";
import { format } from "date-fns";
import Link from "next/link";

import { TDeliveryInfo } from "@/features/admin/delivery/actions/get-deliveries";
import DeliveryStatus from "../components/delivery-status";

const columnHelper = createColumnHelper<TDeliveryInfo>();

export const deliveryColumns = [
    columnHelper.accessor("id", {
        header: () => <span>ID</span>,
        cell: ({ getValue }) => (
            <Link
                href={`/admin/deliveries/${getValue()}`}
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
                className={"max-w-[200px] line-clamp-1"}
            >
                {getValue()}
            </Link>
        ),
    }),
    columnHelper.accessor("driverName", {
        header: () => <span>Driver Name</span>,
        cell: ({ getValue, row }) => (
            <Link
                href={`/admin/drivers/${row.original.driverId}`}
                className={"max-w-[200px] line-clamp-1"}
            >
                {getValue()}
            </Link>
        ),
    }),
    columnHelper.accessor("status", {
        header: () => <span>Delivery Status</span>,
        cell: ({ getValue }) => <DeliveryStatus status={getValue()} />,
    }),
    columnHelper.accessor("createdAt", {
        header: () => <span>Created At</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>
                {format(getValue(), "do MMM yyyy")}
            </span>
        ),
    }),
    columnHelper.accessor("deliveredDate", {
        header: () => <span>Delivered Date</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>
                {getValue()
                    ? format(getValue()!, "do MMM yyyy")
                    : "Not Delivered"}
            </span>
        ),
    }),
];
