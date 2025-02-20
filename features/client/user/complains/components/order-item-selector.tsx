import { Checkbox } from "@/components/ui/checkbox";
import {
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
    value: string;
    onChange: (payload: string | undefined) => void;
};

const OrderItemSelector = ({
    orderId,
    onChange,
    value,
}: OrderItemSelectorProps) => {
    const { data } = useGetOrderItemsByOrderId(orderId);
    return (
        <div>
            <h2 className={"mb-3 text-sm font-medium leading-none"}>
                Select Order Items
            </h2>
            <RadioGroup value={value} onValueChange={onChange}>
                {data &&
                    data.map((item) => (
                        <FormItem
                            key={item.id}
                            className={"flex  items-center gap-x-2"}
                        >
                            <FormControl>
                                <RadioGroupItem value={item.orderItemId} />
                            </FormControl>
                            <FormLabel className={"!m-0 pt-0"}>
                                {item.name}
                            </FormLabel>
                        </FormItem>
                    ))}
            </RadioGroup>
            <FormMessage />
        </div>
    );
};
export default OrderItemSelector;
