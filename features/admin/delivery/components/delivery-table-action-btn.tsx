"use client";
import { EllipsisVertical } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { DELIVERY_STATUS, IDeliveryStatus } from "@/database/schema";
import { useUpdateDelivery } from "@/features/admin/delivery/hooks/use-update-delivery";

const DeliveryTableActionBtn = ({
    deliveryId,
    currentStatus,
}: {
    deliveryId: string;
    currentStatus: IDeliveryStatus;
}) => {
    const { data: session } = useSession();

    const role = session && session?.user.role;

    const { mutateAsync, isPending } = useUpdateDelivery();

    if (role === "WAREHOUSE_MANAGER") {
        return <></>;
    }

    const onStatusChange = (status: IDeliveryStatus) => async () => {
        await mutateAsync({
            deliveryId: deliveryId,
            payload: { deliveryStatus: status },
        });
    };

    return (
        <Popover>
            <PopoverTrigger asChild={true}>
                <Button variant={"ghost"}>
                    <EllipsisVertical />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={"w-fit"}>
                <nav className={"flex flex-col gap-y-2"}>
                    {DELIVERY_STATUS.enumValues
                        .filter((deli) => deli !== currentStatus)
                        .map((item) => (
                            <Button
                                key={item}
                                disabled={isPending}
                                onClick={onStatusChange(item)}
                            >
                                <span>Set as {item}</span>
                            </Button>
                        ))}
                </nav>
            </PopoverContent>
        </Popover>
    );
};

export default DeliveryTableActionBtn;
