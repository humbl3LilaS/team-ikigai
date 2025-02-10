// components/NestedOrderItemsTable.tsx

import React from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table"; // adjust the import path as needed

// Define your data types
interface Product {
    name: string;
    price: number;
}

export interface OrderItem {
    id: string;
    quantity: number;
    product: Product;
}

interface NestedOrderItemsTableProps {
    orderItems: OrderItem[];
}

const NestedOrderItemsTable: React.FC<NestedOrderItemsTableProps> = ({
    orderItems,
}) => {
    return (
        <div className="p-4">
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
                            className="cursor-pointer divide-gray-300 hover:bg-gray-100 transition h-[50px]"
                        >
                            <TableCell>{item.product.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.product.price}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default NestedOrderItemsTable;
