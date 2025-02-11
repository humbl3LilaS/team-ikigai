"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import AddVariantForm from "@/features/admin/products/components/add-variant-form";
import { useAddVariantDialog } from "@/features/admin/products/hooks/use-add-variant-dialog";

const AddVariantDialog = ({ detailId }: { detailId: string }) => {
    const isOpen = useAddVariantDialog((state) => state.isOpen);
    const onOpenChange = useAddVariantDialog((state) => state.onOpenChange);
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild={true}>
                <Button onClick={() => onOpenChange(!isOpen)}>
                    Add New Variant
                </Button>
            </DialogTrigger>
            <DialogContent className={"sm:max-w-[425px]"}>
                <DialogTitle>Restock Item</DialogTitle>
                <DialogDescription>
                    Select color and then restock them in warehouse
                </DialogDescription>
                <AddVariantForm detailId={detailId} />
            </DialogContent>
        </Dialog>
    );
};

export default AddVariantDialog;
