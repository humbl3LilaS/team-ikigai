"use client";
import { EllipsisVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { IOrderStatus } from "@/database/schema";
import { useChangeOrderStatus } from "@/features/admin/orders/hooks/use-change-order-status";
import { parseOrderStatus } from "@/lib/utils";

const OrderTableActionBtn = ({
    orderId,
    status,
}: {
    orderId: string;
    status: IOrderStatus;
}) => {
    const getNextAction = (status: IOrderStatus): IOrderStatus | undefined => {
        switch (status) {
            case "PENDING":
                return "APPROVE";
            case "APPROVE":
                return "ON_THE_WAY";
        }
    };

    const nextStatus = getNextAction(status);
    const { mutateAsync, isPending } = useChangeOrderStatus();

    const onStatusChange = async () => {
        await mutateAsync({ orderId, payload: nextStatus! });
    };

    return (
        <Popover>
            <PopoverTrigger asChild={true}>
                <Button variant={"ghost"}>
                    <EllipsisVertical />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={"w-fit"}>
                <Button
                    className={"capitalize"}
                    disabled={isPending}
                    onClick={onStatusChange}
                >
                    {nextStatus === "ON_THE_WAY" ? (
                        <span>Delivery</span>
                    ) : (
                        <span>{parseOrderStatus(nextStatus!)}</span>
                    )}
                </Button>
            </PopoverContent>
        </Popover>
    );
};

export default OrderTableActionBtn;
