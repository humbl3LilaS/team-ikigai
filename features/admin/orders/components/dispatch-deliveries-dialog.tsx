import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGetDrivers } from "@/features/admin/driver/hooks/use-get-drivers";
import { useDispatchDeliveriesDialog } from "@/features/admin/orders/hooks/use-dispatch-deliveries-dialog";
import { useDispatchDelivery } from "@/features/admin/orders/hooks/use-dispatch-delivery";

const DispatchDeliveriesFormSchema = z.object({
    driver: z.string().min(1),
});

type TDispatchDeliveriesFormSchema = Zod.infer<
    typeof DispatchDeliveriesFormSchema
>;

const DispatchDeliveriesDialog = ({ orderId }: { orderId: string }) => {
    const isOpen = useDispatchDeliveriesDialog((state) => state.isOpen);
    const onOpenChange = useDispatchDeliveriesDialog((state) => state.setOpen);
    const { data: drivers, isLoading } = useGetDrivers();
    const form = useForm({
        resolver: zodResolver(DispatchDeliveriesFormSchema),
        defaultValues: {
            driver: "",
        },
    });
    const { mutateAsync } = useDispatchDelivery();
    const onSubmit: SubmitHandler<TDispatchDeliveriesFormSchema> = async (
        value,
    ) => {
        await mutateAsync({ driver: value.driver, orderId });
        onOpenChange(false);
    };
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild={true}>
                <Button>Dispatch</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Dispatch Deliveries For This Order
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            name={"driver"}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dispatch a Driver</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        disabled={isLoading}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder={"Drivers"}
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {drivers &&
                                                drivers.map((driver, idx) => (
                                                    <SelectItem
                                                        value={driver.id}
                                                        key={driver.id}
                                                        className={
                                                            "w-full flex items-center gap-x-4"
                                                        }
                                                    >
                                                        <span>
                                                            {driver.name}
                                                        </span>
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <Button
                            className={"mt-4 w-full"}
                            type={"submit"}
                            disabled={
                                form.formState.isSubmitting ||
                                !form.formState.isValid
                            }
                        >
                            {form.formState.isSubmitting ? (
                                <>
                                    <Loader2
                                        className={
                                            "mr-2 inline-block animate-spin"
                                        }
                                    />
                                    <span>Dispatching...</span>
                                </>
                            ) : (
                                <span>Dispatch</span>
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default DispatchDeliveriesDialog;
