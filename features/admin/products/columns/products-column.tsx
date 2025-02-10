"use client";

import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

import { TProductInfo } from "@/features/admin/products/actions/get-products";

const columnHelper = createColumnHelper<TProductInfo>();

export const columns = [
    columnHelper.accessor("id", {
        header: () => <span className={"sr-only"}>ID</span>,
        cell: ({ row }) => (
            <Image
                src={row.original.imageUrl}
                alt={row.original.name}
                width={200}
                height={200}
                className={"size-20"}
            />
        ),
    }),
    columnHelper.accessor("name", {
        header: () => <span>Name</span>,
        cell: ({ getValue, row }) => (
            <Link
                href={`/admin/products/${row.original.id}`}
                className={"max-w-[200px] line-clamp-1"}
            >
                {getValue()}
            </Link>
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
