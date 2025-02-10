"use client";
import { createColumnHelper } from "@tanstack/react-table";
import { InferSelectModel } from "drizzle-orm";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { users } from "@/database/schema";

type TCustomers = InferSelectModel<typeof users>;
const columnHelper = createColumnHelper<TCustomers>();

export const CustomersColumns = [
    columnHelper.accessor("id", {
        header: () => <span>ID</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("name", {
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
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

