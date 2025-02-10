"use client";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { TCustomerInfo } from "@/features/admin/customer/actions/get-customers";

const columnHelper = createColumnHelper<TCustomerInfo>();

export const CustomersColumns = [
    columnHelper.accessor("name", {
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ getValue, row }) => (
            <Link
                href={`/admin/customers/${row.original.id}`}
                className={"max-w-[200px] line-clamp-1"}
            >
                {getValue()}
            </Link>
        ),
    }),
    columnHelper.accessor("email", {
        header: () => <span>Email</span>,
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
    columnHelper.accessor("address", {
        header: () => <span>Address</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("region", {
        header: () => <span>Region</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
];
