"use client";
import { format } from "date-fns";
import { CircleChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { useGetOrdersByUserId } from "@/features/client/user/hooks/use-get-orders-by-user-id";
import NestedOrderItemsTable from "@/features/client/user/orders/components/NestedOrderItemsTable";
import { parseOrderStatus } from "@/lib/utils";

interface OrderListPageProps {
    userId: string;
}

const OrderListPage: React.FC<OrderListPageProps> = ({ userId }) => {
    const { data: orders, isLoading } = useGetOrdersByUserId(userId);
    const [expandedOrders, setExpandedOrders] = useState<{
        [key: string]: boolean;
    }>({});

    const toggleOrderExpansion = (orderId: string) => {
        setExpandedOrders((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
    };
    const getStatusBgColor = (status: string) => {
        switch (status) {
            case "ON_THE_WAY":
                return "bg-blue-300";
            case "APPROVE":
                return "bg-green-200";
            case "PENDING":
                return "bg-yellow-200";
            case "FINISH":
                return "bg-green-200";
        }
    };
    return (
        <div className="w-full flex justify-center items-start sm:p-5">
            <div className="w-full sm:w-3/4 mx-auto">
                <div className="flex items-center">
                    <Button variant="link" asChild={true}>
                        <Link href="/profile">
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
                            {orders && orders.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center text-gray-500 font-bold"
                                    >
                                        No orders found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                orders &&
                                orders.map((order) => (
                                    <React.Fragment key={order.id}>
                                        <TableRow
                                            onClick={() =>
                                                toggleOrderExpansion(order.id)
                                            }
                                            className="cursor-pointer hover:bg-gray-100 transition"
                                        >
                                            <TableCell
                                                className={
                                                    "line-clamp-1 max-w-[100px] md:max-w-[150px]"
                                                }
                                            >
                                                {order.id.substring(0, 8)}
                                            </TableCell>
                                            <TableCell>
                                                {format(
                                                    order.createdAt,
                                                    "do MMM yyyy",
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                ${order.totalAmount}
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-3 py-1 text-center rounded-full capitalize ${getStatusBgColor(order.status)}`}
                                                >
                                                    {order.status ===
                                                    "ON_THE_WAY"
                                                        ? "delivering"
                                                        : parseOrderStatus(
                                                              order.status,
                                                          )}
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
                                                        orderId={order.id}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    {!orders && isLoading && (
                        <div className={"mt-2 flex flex-col gap-y-2"}>
                            {Array.from({ length: 10 }, (_, idx) => (
                                <Skeleton className={"w-full h-10"} key={idx} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderListPage;
