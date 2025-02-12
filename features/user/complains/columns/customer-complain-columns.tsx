"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

// 1. Define the type for a customer complain record.
export interface IComplain {
    id: string;
    orderItemId: string;
    subject: string;
    description: string;
    type: "REPAIR" | "EXCHANGE";
    status: "REPAIR" | "EXCHANGE";
    issues: string;
    dateFiled: string;
}

// 2. Create a column helper for the IComplain type.
const columnHelper = createColumnHelper<IComplain>();

// 3. Define the columns for the complaints table.
export const CustomerComplainsColumns = [
    columnHelper.accessor("orderItemId", {
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Order Item ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor("type", {
        header: "Type",
        cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor("issues", {
        header: "Issues",
        cell: ({ getValue }) => (
            <span className="line-clamp-2" title={getValue() as string}>
                {getValue()}
            </span>
        ),
    }),
    columnHelper.accessor("status", {
        header: "Status",
        cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    // Optional: An actions column to view complain details.
    columnHelper.display({
        id: "actions",
        cell: ({ row }) => (
            <Link href={`/complains/${row.original.orderItemId}`}>
                <Button variant="outline" size="sm">
                    View Details
                </Button>
            </Link>
        ),
    }),
];

// 4. Dummy data for testing the table UI.
export const dummyCustomerComplains: IComplain[] = [
    {
        id: "1",
        orderItemId: "oi-1",
        subject: "Faulty Product",
        description: "Product not working as expected",
        type: "REPAIR",
        status: "REPAIR",
        issues: "Not working",
        dateFiled: new Date().toISOString(),
    },
    {
        id: "2",
        orderItemId: "3333-cccc-4444-dddd",
        subject: "Wrong Color",
        description: "Received wrong color product",
        type: "EXCHANGE",
        status: "EXCHANGE",
        issues: "Received the wrong color product and need an exchange.",
        dateFiled: new Date().toISOString(),
    },
    {
        id: "3",
        orderItemId: "5555-eeee-6666-ffff",
        subject: "Screen Issue",
        description: "Screen flickering issue",
        type: "REPAIR",
        status: "REPAIR",
        issues: "Screen flickering when the device is charging.",
        dateFiled: new Date().toISOString(),
    },
];

// --- Dummy Orders Data (simulate user's order history) ---
export const dummyOrders = [
    {
        id: "order-1",
        orderNumber: "ORD-001",
        date: "2025-01-01",
        items: [
            { id: "oi-1", productName: "Product A", quantity: 1 },
            { id: "oi-2", productName: "Product B", quantity: 2 },
        ],
    },
    {
        id: "order-2",
        orderNumber: "ORD-002",
        date: "2025-01-15",
        items: [
            { id: "oi-3", productName: "Product C", quantity: 1 },
            { id: "oi-4", productName: "Product D", quantity: 3 },
        ],
    },
];
