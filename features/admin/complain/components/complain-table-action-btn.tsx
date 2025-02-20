"use client";
import { EllipsisVerticalIcon } from "lucide-react";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { IComplainStatus } from "@/database/schema";
import { TComplains } from "@/features/admin/complain/actions/get-complains";
import ExchangeDialog from "@/features/admin/complain/components/exchange-dialog";
import RepairDialog from "@/features/admin/complain/components/repair-dialog";
import { useUpdateComplain } from "@/features/admin/complain/hooks/use-update-complain";

const ComplainTableActionBtn = ({ data }: { data: TComplains }) => {
    const { mutateAsync, isPending } = useUpdateComplain();
    console.log(data);

    const onApprove = useCallback(async () => {
        await mutateAsync({
            complainId: data.id,
            payload: {
                status: "APPROVE",
            },
        });
    }, [mutateAsync, data.id]);

    const onDecline = useCallback(async () => {
        await mutateAsync({
            complainId: data.id,
            payload: { status: "DECLINED" },
        });
    }, [mutateAsync, data.id]);

    return (
        <Popover>
            <PopoverTrigger asChild={true}>
                <Button variant="link">
                    <EllipsisVerticalIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={"max-w-[200px]"}>
                <nav className={"flex flex-col gap-y-2"}>
                    <Button
                        disabled={
                            !(
                                ["PENDING", "DECLINED"] as IComplainStatus[]
                            ).includes(data.status) || isPending
                        }
                        onClick={onApprove}
                    >
                        Approve
                    </Button>
                    {data.type === "EXCHANGE" ? (
                        <ExchangeDialog
                            disable={data.status !== "APPROVE" || isPending}
                            data={data}
                        />
                    ) : (
                        <RepairDialog
                            disable={data.status !== "APPROVE" || isPending}
                        />
                    )}
                    <Button
                        disabled={
                            !(
                                ["PENDING", "DECLINED"] as IComplainStatus[]
                            ).includes(data.status) || isPending
                        }
                        onClick={onDecline}
                    >
                        Decline
                    </Button>
                </nav>
            </PopoverContent>
        </Popover>
    );
};

export default ComplainTableActionBtn;
