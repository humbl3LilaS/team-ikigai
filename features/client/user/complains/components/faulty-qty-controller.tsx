import { Minus, Plus } from "lucide-react";
import { useCallback, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { useGetOrderItemsByOrderId } from "@/features/client/user/hooks/use-get-order-items-by-order-id";

type FaultyQtyControllerProps = {
    orderId: string;
    orderItemId: string;
    value: number | undefined;
    onChange: (payload: number | undefined) => void;
};
const FaultyQtyController = ({
    orderId,
    value,
    orderItemId,
    onChange,
}: FaultyQtyControllerProps) => {
    const { data } = useGetOrderItemsByOrderId(orderId);
    const allowedQty = useMemo(() => {
        return data
            ? data.find((item) => item.orderItemId === orderItemId)!.quantity
            : 1;
    }, [data, orderItemId]);
    const onIncrease = useCallback(() => {
        onChange((value ?? 1) + 1);
    }, [value, onChange]);
    const onDecrease = useCallback(() => {
        onChange((value ?? 1) - 1);
    }, [value, onChange]);
    return (
        <div
            className={
                "w-fit px-2 py-1 flex items-center gap-x-2 rounded-3xl bg-[#f0f0f0]"
            }
        >
            <Button
                variant={"link"}
                type={"button"}
                onClick={onDecrease}
                disabled={value === 1}
            >
                <Minus />
            </Button>
            <span>{value}</span>
            <Button
                variant={"link"}
                type={"button"}
                onClick={onIncrease}
                disabled={value === allowedQty}
            >
                <Plus />
            </Button>
        </div>
    );
};

export default FaultyQtyController;
