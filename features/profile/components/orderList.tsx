"use client";
import React, { useState } from "react";
import NestedOrderItemsTable, {
    OrderItem,
} from "@/features/profile/components/nestedtable";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SendToBack } from "lucide-react";
import Link from "next/link";

// Define your data types
interface Product {
    name: string;
    price: number;
}

export interface Order {
    id: string;
    orderDate: string;
    status: string;
    totalAmount: number;
    orderItems: OrderItem[];
}

interface OrderListPageProps {
    orders: Order[];
}

const OrderListPage: React.FC<OrderListPageProps> = ({ orders }) => {
    // Track which orders are expanded
    const [expandedOrders, setExpandedOrders] = useState<{
        [key: string]: boolean;
    }>({});

    const toggleOrderExpansion = (orderId: string) => {
        setExpandedOrders((prev) => ({
            ...prev,
            [orderId]: !prev[orderId],
        }));
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-[10vh]">
            <div className="flex justify-between items-center mb-4">
                <Button variant="link">
                    <Link href="/profile">
                        <SendToBack className="size-10" />
                    </Link>
                </Button>

                <h1 className="text-2xl font-bold">Profile Details</h1>
            </div>

            {/* Ensure the parent container has a fixed height & overflow */}
            <div className="overflow-y-auto max-h-[70vh] border rounded-lg shadow-md">
                <Table className="min-w-full bg-white divide-y divide-gray-200">
                    {/* Sticky Header Fix */}
                    <TableHeader className="bg-gray-50 top-0 z-20 shadow-md sticky">
                        <TableRow className="divide-x divide-gray-200 hover:bg-blue-300 bg-blue-300 h-[50px]">
                            <TableHead>Order ID</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Total Amount</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="overflow-y-hidden h-[5vh]">
                        {orders.map((order) => (
                            <React.Fragment key={order.id}>
                                <TableRow
                                    onClick={() =>
                                        toggleOrderExpansion(order.id)
                                    }
                                    className="cursor-pointer divide-gray-300 hover:bg-gray-100 transition h-[50px]"
                                >
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            order.orderDate,
                                        ).toLocaleString()}
                                    </TableCell>
                                    <TableCell>{order.totalAmount}</TableCell>
                                    <TableCell>
                                        <h4
                                            className={`py-1.5 text-center rounded-full 
                                    ${order.status === "Shipped" ? "bg-green-300" : ""} 
                                    ${order.status === "Processing" ? "bg-yellow-300" : ""} 
                                    ${order.status === "Pending" ? "bg-blue-300" : ""}`}
                                        >
                                            {order.status}
                                        </h4>
                                    </TableCell>
                                </TableRow>
                                {expandedOrders[order.id] && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            className="bg-gray-50"
                                        >
                                            <NestedOrderItemsTable
                                                orderItems={order.orderItems}
                                            />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default OrderListPage;
