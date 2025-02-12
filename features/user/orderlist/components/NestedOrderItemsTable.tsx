import React from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { OrderItem } from "../type/order-type";

interface NestedOrderItemsTableProps {
    orderItems: OrderItem[];
}

const NestedOrderItemsTable: React.FC<NestedOrderItemsTableProps> = ({
    orderItems,
}) => {
    return (
        <div className="rounded-lg">
            <h2 className="text-xl font-medium mb-2">Order Items</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orderItems.map((item) => (
                        <TableRow
                            key={item.id}
                            className="hover:bg-gray-100 transition"
                        >
                            <TableCell>{item.product.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>${item.product.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default NestedOrderItemsTable;
