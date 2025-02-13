"use client";

import { createColumnHelper } from "@tanstack/react-table";

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
        header: () => {
            return (
                <Button variant="ghost">
                    Name
                </Button>
            );
        },
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"} title={getValue()}>{getValue()}</span>
        ),
    }),

    columnHelper.accessor("address", {
        header: () => {
            return (
                <Button variant="ghost">
                    Address
                </Button>
            );
        },
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"} title={getValue() || ""}>{getValue()}</span>
        ),
    }),

    columnHelper.accessor("region", {
        header: () => {
            return (
                <Button variant="ghost">
                    Region
                </Button>
            );
        },
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"} title={getValue() || ""}>{getValue()}</span>
        ),
    }),

    columnHelper.accessor("itemName", {
        header: () => {
            return (
                <Button variant="ghost">
                    Item
                </Button>
            );
        },
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"} title={getValue()}>{getValue()}</span>
        ),
    }),

    columnHelper.accessor("itemBrand", {
        header: () => {
            return (
                <Button variant="ghost">
                    Brand
                </Button>
            );
        },
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"} title={getValue()}>{getValue()}</span>
        ),
    }),

    columnHelper.accessor("itemCategory", {
        header: () => {
            return (
                <Button variant="ghost">
                    Category
                </Button>
            );
        },
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"} title={getValue()}>{getValue()}</span>
        ),
    }),

    columnHelper.accessor("price", {
        header: () => {
            return (
                <Button variant="ghost">
                    Price
                </Button>
            );
        },
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue().toLocaleString()}</span>
        ),
    }),

    columnHelper.accessor("quantity", {
        header: () => {
            return (
                <Button variant="ghost">
                    Qty
                </Button>
            );
        },
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"} title={getValue.toString()}>{getValue()}</span>
        ),
    }),

    columnHelper.accessor("totalSum", {
        header: () => {
            return (
                <Button variant="ghost">
                    Total
                </Button>
            );
        },
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue().toLocaleString()}</span>
        ),
    }),

    columnHelper.accessor("orderStatus", {
        header: () => {
            return (
                <Button variant="ghost">
                    Status
                </Button>
            );
        },
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1 text-xs"}>{getValue() == "ON_THE_WAY" ? "DELIVERING" : getValue()}</span>
        ),
    }),


];
