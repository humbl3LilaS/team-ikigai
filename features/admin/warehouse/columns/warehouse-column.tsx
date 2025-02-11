"use client";
import { createColumnHelper } from "@tanstack/table-core";
type TWarehouses = {
    id: string,
    managerId: string,
    phoneNumber: string,
    name: string,
    address: string,
    city: string,
    region: string
}
export const WAREHOUSE_PLACEHOLDER: TWarehouses[] = [
    {
        id: "1",
        managerId: "1",
        phoneNumber: "09794184997",
        name: "Ko Hla Sein",
        address: "Hlaing",
        city: "Yangon",
        region: "Yangon"
    },
    {
        id: "2",
        managerId: "1",
        phoneNumber: "09794184997",
        name: "Ko Win Htun",
        address: "Hlaing",
        city: "Yangon",
        region: "Yangon"
    },
    {
        id: "3",
        managerId: "2",
        phoneNumber: "091231184997",
        name: "Ko Mya",
        address: "Mayangone",
        city: "Yangon",
        region: "Yangon"
    },
    {
        id: "4",
        managerId: "6",
        phoneNumber: "09715123197",
        name: "U Min Htun",
        address: "144/ 919 st.",
        city: "Pyin Oo Lwin",
        region: "Mandalay"
    },
    {
        id: "5",
        managerId: "9",
        phoneNumber: "09151184997",
        name: "U Aung Htun",
        address: "123/76 st.",
        city: "Mandalay",
        region: "Mandalay"
    },
]
const columnHelper = createColumnHelper<TWarehouses>();
export const columns = [
    columnHelper.accessor("id", {
        header: () => <span>ID</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("managerId", {
        header: () => <span>Manager ID</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("phoneNumber", {
        header: () => <span>Phone Number</span>,
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
    columnHelper.accessor("address", {
        header: () => <span>Address</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>{getValue()}</span>
        ),
    }),
    columnHelper.accessor("city", {
        header: () => <span>City</span>,
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