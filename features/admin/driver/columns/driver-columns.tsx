"use client";

import { createColumnHelper } from "@tanstack/table-core";
import Link from "next/link";

import { TDriverInfo } from "@/features/admin/driver/actions/get-drivers";

const columnHelper = createColumnHelper<TDriverInfo>();

export const columns = [
    columnHelper.accessor("name", {
        header: () => <span>Name</span>,
        cell: ({ getValue, row }) => (
            <Link
                href={`/admin/drivers/${row.original.id}`}
                className={"max-w-[200px] line-clamp-1"}
            >
                {getValue()}
            </Link>
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
];
