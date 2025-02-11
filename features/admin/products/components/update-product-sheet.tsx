"use client";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { TProductUpdateSchema } from "@/database/schema";
import UpdateProductForm from "@/features/admin/products/components/update-product-form";
import { useDeleteProductById } from "@/features/admin/products/hooks/use-delete-product-by-id";
import { useUpdateProductSheet } from "@/features/admin/products/hooks/use-update-product-sheet";
import { useConfirm } from "@/hooks/use-confirm";

const UpdateProductSheet = ({ data }: { data: TProductUpdateSchema }) => {
    const isOpen = useUpdateProductSheet((state) => state.isOpen);
    const onOpenChange = useUpdateProductSheet((state) => state.onOpenChange);

    const { mutateAsync, isPending } = useDeleteProductById(data.id!);
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure",
        "You are about to delete this account",
    );
    const router = useRouter();

    const onDelete = async () => {
        const ok = (await confirm()) as boolean;
        if (ok) {
            await mutateAsync();
            onOpenChange(false);
            router.push("/admin/products");
        }
    };
    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onOpenChange}>
                <SheetTrigger asChild={true}>
                    <Button>
                        <Pencil />
                        <span>Edit </span>
                    </Button>
                </SheetTrigger>
                <SheetContent
                    className={
                        "w-full max-w-[400px] space-y-4 overflow-y-scroll "
                    }
                >
                    <SheetHeader>
                        <SheetTitle>Edit account</SheetTitle>
                        <SheetDescription>
                            Edit an existing account
                        </SheetDescription>
                    </SheetHeader>
                    <UpdateProductForm
                        defaultValues={data}
                        onDelete={onDelete}
                        isDeleting={isPending}
                    />
                </SheetContent>
            </Sheet>
        </>
    );
};

export default UpdateProductSheet;
