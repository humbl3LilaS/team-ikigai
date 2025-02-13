"use client";
import { EllipsisVertical } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { IOrderStatus } from "@/database/schema";
import DispatchDeliveriesDialog from "@/features/admin/orders/components/dispatch-deliveries-dialog";
import { useChangeOrderStatus } from "@/features/admin/orders/hooks/use-change-order-status";

const OrderTableActionBtn = ({
    orderId,
    status,
}: {
    orderId: string;
    status: IOrderStatus;
}) => {
    const { data: session } = useSession();

    const role = session && session?.user.role;

    const { mutateAsync, isPending } = useChangeOrderStatus();

    if (role === "SALES" && (status === "ON_THE_WAY" || status === "APPROVE")) {
        return <></>;
    }

    if (role === "WAREHOUSE_MANAGER" && status === "PENDING") {
        return <></>;
    }

    return (
        <Popover>
            <PopoverTrigger asChild={true}>
                <Button variant={"ghost"}>
                    <EllipsisVertical />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={"w-fit"}>
                {status === "PENDING" && (
                    <Button
                        disabled={isPending}
                        onClick={async () => {
                            await mutateAsync({
                                orderId,
                                payload: "APPROVE" as IOrderStatus,
                            });
                        }}
                    >
                        Approve
                    </Button>
                )}
                {status === "APPROVE" && (
                    <DispatchDeliveriesDialog orderId={orderId} />
                )}
            </PopoverContent>
        </Popover>
    );
};

export default OrderTableActionBtn;
