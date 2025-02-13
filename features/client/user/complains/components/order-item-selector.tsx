import { Checkbox } from "@/components/ui/checkbox";
import { FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useGetOrderItemsByOrderId } from "@/features/client/user/hooks/use-get-order-items-by-order-id";

type OrderItemSelectorProps = {
    orderId: string;
    value: string[] | undefined;
    onChange: (payload: string[] | undefined) => void;
};

const OrderItemSelector = ({
    orderId,
    onChange,
    value,
}: OrderItemSelectorProps) => {
    const { data } = useGetOrderItemsByOrderId(orderId);
    return (
        <div>
            <h2>Select Order Items</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className={"sr-only"}>Check</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Qty</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data &&
                        data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <Checkbox
                                        id={item.id}
                                        checked={
                                            value &&
                                            value.includes(item.orderItemId)
                                        }
                                        onCheckedChange={(check) => {
                                            if (check && value) {
                                                onChange([
                                                    ...value,
                                                    item.orderItemId,
                                                ]);
                                            }
                                            if (!check && value) {
                                                onChange(
                                                    value.filter(
                                                        (val) =>
                                                            val !==
                                                            item.orderItemId,
                                                    ),
                                                );
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Label htmlFor={item.id}>{item.name}</Label>
                                </TableCell>
                                <TableCell>{item.quantity}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <FormMessage />
        </div>
    );
};
export default OrderItemSelector;
