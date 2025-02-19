import { EllipsisVerticalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { TComplains } from "@/features/admin/complain/actions/get-complains";
import { useUpdateComplain } from "@/features/admin/complain/hooks/use-update-complain";

const ComplainTableActionBtn = ({ data }: { data: TComplains }) => {
    const { mutateAsync, isPending } = useUpdateComplain();
    const onApprove = async () => {
        await mutateAsync({
            complainId: data.id,
            payload: {
                status: "APPROVE",
            },
        });
    };
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
                        disabled={data.status !== "PENDING" || isPending}
                        onClick={onApprove}
                    >
                        Approve
                    </Button>
                    <Button disabled={data.status !== "APPROVE" || isPending}>
                        Dispatch Service
                    </Button>
                    <Button disabled={data.status !== "PENDING" || isPending}>
                        Decline
                    </Button>
                </nav>
            </PopoverContent>
        </Popover>
    );
};

export default ComplainTableActionBtn;
