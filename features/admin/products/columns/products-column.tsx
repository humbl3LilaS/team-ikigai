"use client";

import { createColumnHelper } from "@tanstack/react-table";

export type TProduct = {
    id: number;
    name: string;
    category: string;
    brand: string;
    price: number;
    description: string;
    discount: number;
    warehouse_id: string;
};

const columnHelper = createColumnHelper<TProduct>();

export const columns = [
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
    columnHelper.accessor("category", {
        header: () => <span>Category</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("brand", {
        header: () => <span>Brand</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("price", {
        header: () => <span>Price</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
];
