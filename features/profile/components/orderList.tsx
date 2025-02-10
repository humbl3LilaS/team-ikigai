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
import { CircleChevronLeft } from "lucide-react";
import Link from "next/link";
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
        <div className="w-full sm:w-3/4 mx-auto mt-4">
            <div className="">
                <div className="flex items-center">
                    <Button variant="link">
                        <Link href="/profile">
                            <CircleChevronLeft
                                style={{
                                    width: "1.5rem",
                                    height: "1.5rem",
                                }}
                            />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">Order List</h1>
                </div>
            </div>

            {/* Ensure the parent container has a fixed height & overflow */}
            <div className="overflow-y-auto max-h-[500px] p-4">
                <Table className="">
                    <TableHeader className="sticky top-0 z-10 bg-white shadow-md">
                        <TableRow className="divide-x divide-gray-200 bg-blue-300 h-[50px]">
                            <TableHead>Order ID</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Total Amount</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
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
                                            className={`p-2 text-center rounded-full 
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
