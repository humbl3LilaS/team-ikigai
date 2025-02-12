"use client";

import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { ChevronDown, CircleChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// Import the columns and dummy data for complaints.
import { useToast } from "@/hooks/use-toast";

import {
    CustomerComplainsColumns,
    dummyCustomerComplains,
    IComplain,
    dummyOrders,
} from "../columns/customer-complain-columns";

// --- Complain Types ---
const COMPLAIN_TYPES = ["REPAIR", "EXCHANGE"];

// --- Form Data Structure ---
interface ComplaintFormData {
    orderId: string;
    selectedOrderItems: string[];
    complainType: string;
    issues: string;
}

const truncateId = (id: string, length: number = 4) =>
    `${id.slice(0, length)}...`;

export default function CustomerComplaintForm() {
    const form = useForm<ComplaintFormData>({
        defaultValues: {
            orderId: "",
            selectedOrderItems: [],
            complainType: "",
            issues: "",
        },
    });

    const {
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = form;

    const { toast } = useToast();
    const router = useRouter();

    // Dropdown open states for the orders selection and complain type fields.
    const [orderDropdownOpen, setOrderDropdownOpen] = useState(false);
    const [complainTypeDropdownOpen, setComplainTypeDropdownOpen] =
        useState(false);

    // Watch the selected orders ID so we can show its items for multi-selection.
    const selectedOrderId = watch("orderId");
    const selectedOrder = dummyOrders.find(
        (order) => order.id === selectedOrderId,
    );

    // Complaints state: start with the dummy data imported from the columns file.
    const [complaints, setComplaints] = useState<IComplain[]>(
        dummyCustomerComplains,
    );

    // Handle form submission: for each selected orders item, create a complaint record.
    const onSubmit = (data: ComplaintFormData) => {
        if (!selectedOrder) {
            toast({
                title: "Please select a valid orders.",
                description: "Please select a valid orders.",
                variant: "destructive",
            });
            return;
        }
        if (data.selectedOrderItems.length === 0) {
            toast({
                title: "Please select at least one orders item.",
                description: "Please select at least one orders item.",
                variant: "destructive",
            });
            return;
        }

        const newComplaints: IComplain[] = data.selectedOrderItems.map(
            (orderItemId, index) => ({
                id: crypto.randomUUID(),
                orderItemId,
                subject: `${data.complainType} Request`,
                description: data.issues,
                type: data.complainType as "REPAIR" | "EXCHANGE",
                status: data.complainType as "REPAIR" | "EXCHANGE",
                issues: data.issues,
                dateFiled: new Date().toISOString(),
            }),
        );

        setComplaints((prev) => [...prev, ...newComplaints]);
        toast({
            title: "Complain form submit successfully",
            description: "successfully submit complain form",
        });
        reset();
    };

    // Set up TanStack React Table for displaying the complaints.
    const table = useReactTable({
        data: complaints,
        columns: CustomerComplainsColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="w-full p-3 flex flex-col md:flex-row justify-evenly items-center md:items-start">
            {/* Complaint Form */}
            <div className="w-full min-w-[406.4px] max-w-md p-4 shadow rounded mb-6 bg-white">
                <div className="flex items-center space-x-2 mb-4">
                    <Button variant="link">
                        <Link href="/profile">
                            <CircleChevronLeft className="w-6 h-6" />
                        </Link>
                    </Button>
                    <h1 className="text-xl font-bold">Submit a Complaint</h1>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {/* Order Selection Dropdown */}
                        <FormField
                            control={form.control}
                            name="orderId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm">
                                        Select Order
                                    </FormLabel>
                                    <FormControl className="min-w-full">
                                        <DropdownMenu
                                            onOpenChange={setOrderDropdownOpen}
                                        >
                                            <DropdownMenuTrigger asChild>
                                                <div className="relative">
                                                    <Input
                                                        readOnly
                                                        value={
                                                            selectedOrder
                                                                ? `${selectedOrder.orderNumber} - ${selectedOrder.date}`
                                                                : field.value ||
                                                                  "Select an orders"
                                                        }
                                                        className="cursor-pointer text-sm min-w-full"
                                                    />
                                                    <ChevronDown
                                                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform ${
                                                            orderDropdownOpen
                                                                ? "rotate-180"
                                                                : ""
                                                        }`}
                                                        size={20}
                                                    />
                                                </div>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white shadow-lg rounded-md max-h-[300px] overflow-auto z-50"
                                                align="start"
                                                sideOffset={4}
                                            >
                                                {dummyOrders.map((order) => (
                                                    <DropdownMenuItem
                                                        key={order.id}
                                                        onSelect={() =>
                                                            field.onChange(
                                                                order.id,
                                                            )
                                                        }
                                                        className="cursor-pointer px-3 py-2 hover:bg-gray-100 text-sm"
                                                    >
                                                        {order.orderNumber} -{" "}
                                                        {order.date}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </FormControl>
                                    <FormMessage>
                                        {errors.orderId?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        {/* Order Items Multi-Select Table */}
                        {selectedOrder && (
                            <div>
                                <h2 className="text-sm font-semibold mb-2">
                                    Select Order Items
                                </h2>
                                <table className="w-full text-sm table-auto border-collapse mb-4">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="p-2 border">
                                                Select
                                            </th>
                                            <th className="p-2 border">
                                                Product
                                            </th>
                                            <th className="p-2 border">Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedOrder.items.map((item) => {
                                            const currentSelectedItems =
                                                watch("selectedOrderItems") ||
                                                [];
                                            const isChecked =
                                                currentSelectedItems.includes(
                                                    item.id,
                                                );
                                            return (
                                                <tr
                                                    key={item.id}
                                                    className="border"
                                                >
                                                    <td className="p-2 border text-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={isChecked}
                                                            onChange={(e) => {
                                                                if (
                                                                    e.target
                                                                        .checked
                                                                ) {
                                                                    setValue(
                                                                        "selectedOrderItems",
                                                                        [
                                                                            ...currentSelectedItems,
                                                                            item.id,
                                                                        ],
                                                                    );
                                                                } else {
                                                                    setValue(
                                                                        "selectedOrderItems",
                                                                        currentSelectedItems.filter(
                                                                            (
                                                                                id: string,
                                                                            ) =>
                                                                                id !==
                                                                                item.id,
                                                                        ),
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    </td>
                                                    <td className="p-2 border">
                                                        {item.productName}
                                                    </td>
                                                    <td className="p-2 border text-center">
                                                        {item.quantity}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                {errors.selectedOrderItems && (
                                    <p className="text-red-500 text-xs">
                                        {errors.selectedOrderItems.message}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Complain Type Dropdown */}
                        <FormField
                            control={form.control}
                            name="complainType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm">
                                        Complain Type
                                    </FormLabel>
                                    <FormControl>
                                        <DropdownMenu
                                            onOpenChange={
                                                setComplainTypeDropdownOpen
                                            }
                                        >
                                            <DropdownMenuTrigger asChild>
                                                <div className="relative">
                                                    <Input
                                                        readOnly
                                                        value={
                                                            field.value ||
                                                            "Select complain type"
                                                        }
                                                        className="cursor-pointer text-sm w-full"
                                                    />
                                                    <ChevronDown
                                                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform ${
                                                            complainTypeDropdownOpen
                                                                ? "rotate-180"
                                                                : ""
                                                        }`}
                                                        size={20}
                                                    />
                                                </div>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white shadow-lg rounded-md max-h-[300px] overflow-auto z-50"
                                                align="start"
                                                sideOffset={4}
                                            >
                                                {COMPLAIN_TYPES.map((type) => (
                                                    <DropdownMenuItem
                                                        key={type}
                                                        onSelect={() =>
                                                            field.onChange(type)
                                                        }
                                                        className="cursor-pointer px-3 py-2 hover:bg-gray-100 text-sm"
                                                    >
                                                        {type}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </FormControl>
                                    <FormMessage>
                                        {errors.complainType?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        {/* Issues TextArea */}
                        <FormField
                            control={form.control}
                            name="issues"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm">
                                        Describe Your Issues
                                    </FormLabel>
                                    <FormControl>
                                        <textarea
                                            {...field}
                                            placeholder="Please describe your issue(s)..."
                                            className="w-full p-2 border rounded text-sm"
                                            rows={4}
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {errors.issues?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <Button type="submit" className="text-sm">
                                Submit Complaint
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>

            {/* Complaints Table – using the imported columns and dummy data */}
            <div className="min-w-[50vw] p-5 sm:p-0">
                <div className="min-w-full  sm:w-3/4 mx-auto p-4 shadow rounded bg-white">
                    <h2 className="text-xl font-bold mb-4">Your Complaints</h2>
                    <Table className="rounded-lg overflow-hidden">
                        <TableHeader className="sticky top-0 z-10">
                            <TableRow className="divide-x divide-white h-[50px]">
                                <TableHead>ID</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date Filed</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* {complaints.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center text-gray-500 font-bold"
                                    >
                                        No complaints found
                                    </TableCell>
                                </TableRow>
                            )} */}

                            {complaints.map((complaint) => (
                                <TableRow
                                    key={complaint.id}
                                    className="hover:bg-gray-100 transition h-[50px]"
                                >
                                    <TableCell className="max-w-[50px] bg-red-200">
                                        {truncateId(complaint.id)}
                                    </TableCell>
                                    <TableCell>{complaint.subject}</TableCell>
                                    <TableCell className="text-[15px] break-words">
                                        {complaint.description}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`p-1 text-center text-[12px] rounded-full 
                                            ${complaint.status === "REPAIR" ? "bg-yellow-300" : ""} 
                                            ${complaint.status === "EXCHANGE" ? "bg-green-500" : ""}`}
                                        >
                                            {complaint.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(
                                            complaint.dateFiled,
                                        ).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
