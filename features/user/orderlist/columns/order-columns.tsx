"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Order } from "../type/order-type";

const columnHelper = createColumnHelper<Order>();

export const OrderColumns = [
    columnHelper.accessor("id", {
        header: "Order ID",
        cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor("orderDate", {
        header: "Order Date",
        cell: ({ getValue }) => (
            <span>{new Date(getValue()).toLocaleString()}</span>
        ),
    }),
    columnHelper.accessor("totalAmount", {
        header: "Total Amount",
        cell: ({ getValue }) => <span>${getValue()}</span>,
    }),
    columnHelper.accessor("status", {
        header: "Status",
        cell: ({ getValue }) => {
            const status = getValue();
            return (
                <span
                    className={`p-2 text-center rounded-full ${
                        status === "ON_THE_WAY"
                            ? "bg-green-500"
                            : status === "APPROVE"
                              ? "bg-green-300"
                              : status === "PENDING"
                                ? "bg-yellow-300"
                                : ""
                    }`}
                >
                    {status}
                </span>
            );
        },
    }),
];
