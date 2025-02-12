"use client";
import { createColumnHelper } from "@tanstack/table-core";
type TDriverDetailss = {
    id: string,
    order_id: string,
    createdAt: Date,
    deliveredDate: Date,
    deliveryStatus: string,
}
export const DRIVER_DELIVERIES_DETAILS_PLACEHOLDER: TDriverDetailss[] = [
    {
        id: "1",
        order_id: "1",
        createdAt: new Date(),
        deliveredDate: new Date(),
        deliveryStatus: "Pending",
    },
    {
        id: "2",
        order_id: "1",
        createdAt: new Date(),
        deliveredDate: new Date(),
        deliveryStatus: "Pending",
    },
    {
        id: "3",
        order_id: "2",
        createdAt: new Date(),
        deliveredDate: new Date(),
        deliveryStatus: "Pending",
    },
    {
        id: "4",
        order_id: "6",
        createdAt: new Date(),
        deliveredDate: new Date(),
        deliveryStatus: "Pending",
    },
    {
        id: "5",
        order_id: "9",
        createdAt: new Date(),
        deliveredDate: new Date(),
        deliveryStatus: "Pending",
    },
]
const columnHelper = createColumnHelper<TDriverDetailss>();
export const columns = [
    columnHelper.accessor("id", {
        header: () => <span>Delivery ID</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("order_id", {
        header: () => <span>Order ID</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("createdAt", {
        header: () => <span>Created At</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue().toLocaleDateString()}</span>
        ),
    }),
    columnHelper.accessor("deliveredDate", {
        header: () => <span>Delivered Date</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue().toLocaleDateString()}</span>
        ),
    }),
    columnHelper.accessor("deliveryStatus", {
        header: () => <span>Delivery Status</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
];