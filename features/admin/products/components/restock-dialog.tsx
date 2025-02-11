"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { RestockProductForm } from "@/features/admin/products/components/restock-product-form";
import { useRestockDialog } from "@/features/admin/products/hooks/use-restock-dialog";

type RestockPopoverProps = {
    variants: {
        productId: string;
        colorHex: string;
        stock: number;
    }[];
};

const RestockDialog = ({ variants }: RestockPopoverProps) => {
    const isOpen = useRestockDialog((state) => state.isOpen);
    const onOpenChange = useRestockDialog((state) => state.onOpenChange);
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild={true}>
                <Button onClick={() => onOpenChange(!isOpen)}>
                    Restock Items
                </Button>
            </DialogTrigger>
            <DialogContent className={"sm:max-w-[425px]"}>
                <DialogTitle>Restock Item</DialogTitle>
                <DialogDescription>
                    Select color and then restock them in warehouse
                </DialogDescription>
                <RestockProductForm variants={variants} />
            </DialogContent>
        </Dialog>
    );
};

export default RestockDialog;
