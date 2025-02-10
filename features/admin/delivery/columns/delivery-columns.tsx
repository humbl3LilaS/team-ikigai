"use client";

import { createColumnHelper } from "@tanstack/table-core";

type TDelivery = {
    id: string,
    orderId: string,
    driverId: string,
    deliveryStatus: string,
    createdAt: string,
    deliveredDate: String
}

export const DELIVERIES_PLACEHOLDER: TDelivery[] = [
    {
        id: "1",
        orderId: "1",
        driverId: "4",
        deliveryStatus: "Pending",
        createdAt: "3/2/2025",
        deliveredDate: "3/2/2025"
    },
    {
        id: "2",
        orderId: "12",
        driverId: "8",
        deliveryStatus: "Approved",
        createdAt: "3/2/2025",
        deliveredDate: "3/2/2025"
    },
    {
        id: "3",
        orderId: "4",
        driverId: "1",
        deliveryStatus: "Pending",
        createdAt: "3/2/2025",
        deliveredDate: "3/2/2025"
    },
    {
        id: "4",
        orderId: "5",
        driverId: "2",
        deliveryStatus: "Approved",
        createdAt: "3/2/2025",
        deliveredDate: "3/2/2025"
    },
    {
        id: "5",
        orderId: "5",
        driverId: "6",
        deliveryStatus: "Delivering",
        createdAt: "3/2/2025",
        deliveredDate: "3/2/2025"
    },
]

const columnHelper = createColumnHelper<TDelivery>();

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
    columnHelper.accessor("driverId", {
        header: () => <span>Driver ID</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("deliveryStatus", {
        header: () => <span>Delivery Status</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("createdAt", {
        header: () => <span>Created At</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("deliveredDate", {
        header: () => <span>Delivered Date</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
];

