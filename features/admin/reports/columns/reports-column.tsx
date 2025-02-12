"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import { TSaleReports } from "../actions/get-sale-reports";

const columnHelper = createColumnHelper<TSaleReports>();

export const columns = [
    columnHelper.accessor("id", {
        header: () => {
            return (
                <span>Id</span>
            );
        },
        cell: ({ getValue }) => (
            <span title={getValue()} className="max-w-10 truncate block">{getValue()}</span>),
    }),

    columnHelper.accessor("name", {
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Name <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"} title={getValue()}>{getValue()}</span>
        ),
    }),

    columnHelper.accessor("address", {
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Address <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"} title={getValue() || ""}>{getValue()}</span>
        ),
    }),

    columnHelper.accessor("region", {
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Region <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"} title={getValue() || ""}>{getValue()}</span>
        ),
    }),

    columnHelper.accessor("itemName", {
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Item <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"} title={getValue()}>{getValue()}</span>
        ),
    }),

    columnHelper.accessor("itemBrand", {
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Brand <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"} title={getValue()}>{getValue()}</span>
        ),
    }),

    columnHelper.accessor("itemCategory", {
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Category <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"} title={getValue()}>{getValue()}</span>
        ),
    }),

    columnHelper.accessor("price", {
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Price <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue().toLocaleString()}</span>
        ),
    }),

    columnHelper.accessor("quantity", {
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Qty <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"} title={getValue.toString()}>{getValue()}</span>
        ),
    }),

    columnHelper.accessor("totalSum", {
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Total <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue().toLocaleString()}</span>
        ),
    }),

    columnHelper.accessor("orderStatus", {
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Status <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1 text-xs"}>{getValue()}</span>
        ),
    }),


];
