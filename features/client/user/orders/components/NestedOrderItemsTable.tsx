import { Loader2 } from "lucide-react";
import React from "react";

import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { useGetOrderItemsByOrderId } from "@/features/client/user/hooks/use-get-order-items-by-order-id";

interface NestedOrderItemsTableProps {
    orderId: string;
}

const NestedOrderItemsTable: React.FC<NestedOrderItemsTableProps> = ({
    orderId,
}) => {
    const { data: orderItems } = useGetOrderItemsByOrderId(orderId);
    return (
        <div className="rounded-lg">
            <h2 className="text-xl font-medium mb-2">Order Items</h2>
            <Table>
                <TableHeader>
                    <TableRow className={"hover:bg-transparent"}>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orderItems &&
                        orderItems.map((item) => (
                            <TableRow
                                key={item.id}
                                className="hover:bg-transparent transition"
                            >
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>${item.price}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            {!orderItems && (
                <div className="flex items-center justify-center w-full">
                    <Loader2 className={"animate-spin"} />
                    <span>Loading...</span>
                </div>
            )}
        </div>
    );
};

export default NestedOrderItemsTable;
