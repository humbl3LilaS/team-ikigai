"use client";

import { createColumnHelper } from "@tanstack/table-core";

type TDriver = {
    id: string,
    userId: string,
    vehiclePlateNumber: string,
    deliveryRoute: string,
    warehouseId: string,
    orderLimit: number
}

export const DRIVER_PLACEHOLDER: TDriver[] = [
    {
        id: "1",
        userId: "1",
        vehiclePlateNumber: "3H-0912",
        deliveryRoute: "Hlaing",
        warehouseId: "1",
        orderLimit: 5
    },
    {
        id: "2",
        userId: "2",
        vehiclePlateNumber: "3H-0912",
        deliveryRoute: "Mayangone",
        warehouseId: "1",
        orderLimit: 5
    },
    {
        id: "3",
        userId: "3",
        vehiclePlateNumber: "3H-0912",
        deliveryRoute: "Pyay",
        warehouseId: "1",
        orderLimit: 5
    },
    {
        id: "4",
        userId: "4",
        vehiclePlateNumber: "3H-1912",
        deliveryRoute: "Hlaing",
        warehouseId: "2",
        orderLimit: 5
    },
    {
        id: "5",
        userId: "5",
        vehiclePlateNumber: "3H-0912",
        deliveryRoute: "Hlaing",
        warehouseId: "2",
        orderLimit: 4
    },
]

const columnHelper = createColumnHelper<TDriver>();

export const columns = [
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
    columnHelper.accessor("vehiclePlateNumber", {
        header: () => <span>Vehicle Plate Number</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("deliveryRoute", {
        header: () => <span>Delivery Route</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("warehouseId", {
        header: () => <span>Warehouse ID</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("orderLimit", {
        header: () => <span>Order Limit</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
];
