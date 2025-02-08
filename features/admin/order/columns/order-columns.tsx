"use client";

import { createColumnHelper } from "@tanstack/react-table";

type TOrder = {
    id: string;
    userId: string;
    status: "PENDING" | "REJECTED" | "CONFIRMED";
    orderDate: Date;
    totalAmount: number;
};

export const ORDER_PLACEHOLDER: TOrder[] = [
    {
        id: "ord_1",
        userId: "user_1",
        status: "PENDING",
        orderDate: new Date("2024-02-01T10:30:00Z"),
        totalAmount: 49.99,
    },
    {
        id: "ord_2",
        userId: "user_2",
        status: "CONFIRMED",
        orderDate: new Date("2024-02-02T14:15:00Z"),
        totalAmount: 120.5,
    },
    {
        id: "ord_3",
        userId: "user_3",
        status: "REJECTED",
        orderDate: new Date("2024-02-03T09:45:00Z"),
        totalAmount: 75.0,
    },
    {
        id: "ord_4",
        userId: "user_4",
        status: "PENDING",
        orderDate: new Date("2024-02-04T18:20:00Z"),
        totalAmount: 200.0,
    },
    {
        id: "ord_5",
        userId: "user_5",
        status: "CONFIRMED",
        orderDate: new Date("2024-02-05T12:10:00Z"),
        totalAmount: 15.75,
    },
    {
        id: "ord_6",
        userId: "user_6",
        status: "REJECTED",
        orderDate: new Date("2024-02-06T08:30:00Z"),
        totalAmount: 95.25,
    },
    {
        id: "ord_7",
        userId: "user_7",
        status: "CONFIRMED",
        orderDate: new Date("2024-02-07T20:45:00Z"),
        totalAmount: 300.99,
    },
    {
        id: "ord_8",
        userId: "user_8",
        status: "PENDING",
        orderDate: new Date("2024-02-08T16:00:00Z"),
        totalAmount: 50.5,
    },
    {
        id: "ord_9",
        userId: "user_9",
        status: "REJECTED",
        orderDate: new Date("2024-02-09T11:55:00Z"),
        totalAmount: 85.0,
    },
    {
        id: "ord_10",
        userId: "user_10",
        status: "CONFIRMED",
        orderDate: new Date("2024-02-10T13:25:00Z"),
        totalAmount: 175.6,
    },
];

const columnHelper = createColumnHelper<TOrder>();

export const columns = [
    columnHelper.accessor("id", {
        header: () => <span>ID</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
];
