"use client";
import { createColumnHelper } from "@tanstack/react-table";

export type TCustomers = {
    id: number;
    name: string;
    password: string;
    email: string;
    phone: string;
    address: string;
    township: string;
    region: string;
    role: string;
};

const columnHelper = createColumnHelper<TCustomers>();

export const CustomersColumns = [
    columnHelper.accessor("id", {
        header: () => <span>ID</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("name", {
        header: () => <span>Name</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("email", {
        header: () => <span>Email</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("phone", {
        header: () => <span>Phone</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
];
