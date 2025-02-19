"use client";
import { createColumnHelper } from "@tanstack/table-core";
import Link from "next/link";

import { TWarehouse } from "../actions/get-warehouses";


const columnHelper = createColumnHelper<TWarehouse>();

export const columns = [
    columnHelper.accessor("id", {
        header: () => <span>ID</span>,
        cell: ({ getValue }) => (
            <Link href={`/admin/warehouses/${getValue()}`} className={"max-w-[200px] hover:text-blue-600 underline underline-offset-2 line-clamp-1"}>{getValue()}</Link>
        ),
    }),
    columnHelper.accessor("managerName", {
        header: () => <span>Manager Name</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("wareHouseName", {
        header: () => <span>Warehouse Name</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),

    columnHelper.accessor("phoneNumber", {
        header: () => <span>Phone</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("warehouseAddress", {
        header: () => <span>Address</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),

    columnHelper.accessor("warehouseCity", {
        header: () => <span>City</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),

    columnHelper.accessor("warehouseRegion", {
        header: () => <span>Region</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
];