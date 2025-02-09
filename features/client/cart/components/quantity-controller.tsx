"use client";
import { useQueryClient } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    ICartItem,
    useCartStore,
} from "@/features/client/cart/hooks/use-cart-store";
import { useToast } from "@/hooks/use-toast";

type QuantityControllerProps = {
    data: ICartItem;
};
const QuantityController = ({ data }: QuantityControllerProps) => {
    const increaseQty = useCartStore((state) => state.increaseQuantity);
    const reduceQty = useCartStore((state) => state.reduceQuantity);
    const remove = useCartStore((state) => state.removeFromCart);
    const queryClient = useQueryClient();

    const onDecrease = () => {
        if (data.q === 1) {
            remove({ ...data });
            queryClient.removeQueries({
                queryKey: ["cart-item", data.pid, data.cid],
            });
        } else {
            reduceQty({ ...data });
        }
    };

    const onIncrease = () => {
        increaseQty({ ...data });
    };
    return (
        <div
            className={
                "w-fit px-2 py-1 flex items-center gap-x-2 rounded-3xl bg-[#f0f0f0]"
            }
        >
            <Button variant={"link"} type={"button"} onClick={onDecrease}>
                <Minus />
            </Button>
            <span>{data.q}</span>
            <Button variant={"link"} type={"button"} onClick={onIncrease}>
                <Plus />
            </Button>
        </div>
    );
};

export default QuantityController;
