import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const RepairDialog = ({ disable }: { disable: boolean }) => {
    return (
        <Dialog>
            <DialogTrigger asChild={true}>
                <Button>Dispatch Service</Button>
            </DialogTrigger>
            <DialogContent className={"sm:max-w-[425px]"}>
                <DialogHeader>
                    <DialogTitle>
                        Dispatch new delivery to exchange faulty product.
                    </DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default RepairDialog;
