"use client";
import React, { useState, useEffect } from "react";
import NestedOrderItemsTable from "@/features/user/orderlist/components/NestedOrderItemsTable";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CircleChevronLeft } from "lucide-react";
import Link from "next/link";
import { getUserOrders } from "../actions/get-orders";
import { Order, dummyOrders } from "../type/order-type";

interface OrderListPageProps {
    userId: string;
}

const OrderListPage: React.FC<OrderListPageProps> = ({ userId }) => {
    const [orders, setOrders] = useState<Order[]>(dummyOrders);
    const [expandedOrders, setExpandedOrders] = useState<{
        [key: string]: boolean;
    }>({});

    useEffect(() => {
        async function fetchOrders() {
            const data = await getUserOrders(userId);
            // setOrders(data ?? dummyOrders);
        }
        fetchOrders();
    }, [userId]);

    const toggleOrderExpansion = (orderId: string) => {
        setExpandedOrders((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
    };

    return (
        <div className="w-full flex justify-center items-start sm:p-5">
            <div className="w-full sm:w-3/4 mx-auto">
                <div className="flex items-center">
                    <Button variant="link">
                        <Link href="/category">
                            <CircleChevronLeft
                                style={{ width: "1.5rem", height: "1.5rem" }}
                            />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">Order List</h1>
                </div>

                <div className="p-4 rounded-lg shadow-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Order Date</TableHead>
                                <TableHead>Total Amount</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center text-gray-500 font-bold"
                                    >
                                        No orders found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                orders.map((order) => (
                                    <React.Fragment key={order.id}>
                                        <TableRow
                                            onClick={() =>
                                                toggleOrderExpansion(order.id)
                                            }
                                            className="cursor-pointer hover:bg-gray-100 transition"
                                        >
                                            <TableCell>{order.id}</TableCell>
                                            <TableCell>
                                                {new Date(
                                                    order.orderDate,
                                                ).toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                ${order.totalAmount}
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-3 py-1 text-center rounded-full ${
                                                        order.status ===
                                                        "ON_THE_WAY"
                                                            ? "bg-green-300"
                                                            : order.status ===
                                                                "APPROVE"
                                                              ? "bg-green-200"
                                                              : order.status ===
                                                                  "PENDING"
                                                                ? "bg-yellow-200"
                                                                : ""
                                                    }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                        {expandedOrders[order.id] && (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={4}
                                                    className={` 
                                    ${order.status === "ON_THE_WAY" ? "bg-green-200" : ""} 
                                    ${order.status === "APPROVE" ? "bg-green-200" : ""} 
                                    ${order.status === "PENDING" ? "bg-yellow-200" : ""}`}
                                                >
                                                    <NestedOrderItemsTable
                                                        orderItems={
                                                            order.orderItems
                                                        }
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default OrderListPage;
