"use client";

import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TComplainDetails } from "@/features/client/user/complains/actions/get-complains";

const ComplainDialog = ({ data }: { data: TComplainDetails }) => {
    return (
        <Dialog>
            <DialogTrigger asChild={true}>
                <Button variant={"link"}>
                    {data.issues.length > 20
                        ? data.issues.slice(0, 20) + "..."
                        : data.issues}
                </Button>
            </DialogTrigger>
            <DialogContent className={"p-6"}>
                <DialogTitle>Complain#{data.id.slice(0, 8)}...</DialogTitle>
                <DialogDescription>
                    Your complain is filed at{" "}
                    <span className={"font-semibold text-black"}>
                        {format(data.createdAt, "do MMM yyyy")}
                    </span>
                    .
                </DialogDescription>
                <div>
                    <p>
                        <span className={"font-semibold"}>Reason:</span>
                        &nbsp;
                        <span>{data.issues}</span>
                    </p>
                    <p>
                        <span className={"font-semibold"}>Status:</span>
                        &nbsp;
                        <span className={"capitalize font-semibold"}>
                            {data.status.toLowerCase()}
                        </span>
                    </p>
                    <Table className={"mt-3"}>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Qty</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>{data.productName}</TableCell>
                                <TableCell>{data.qty}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <DialogFooter>
                    <DialogClose asChild={true}>
                        <Button>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ComplainDialog;
