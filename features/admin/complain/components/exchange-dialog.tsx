"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
import { TComplains } from "@/features/admin/complain/actions/get-complains";
import { useExchangeDialog } from "@/features/admin/complain/hooks/use-exchange-dialog";
import { useExchangeFaultyProduct } from "@/features/admin/complain/hooks/use-exchange-faulty-product";
import { useGetDrivers } from "@/features/admin/driver/hooks/use-get-drivers";

const ExchangeSchema = z.object({
    driverId: z.string().min(1, { message: "Please Select a Driver" }),
});

type TExchangeSchema = Zod.infer<typeof ExchangeSchema>;

const ExchangeDialog = ({
    disable,
    data,
}: {
    disable: boolean;
    data: TComplains;
}) => {
    const open = useExchangeDialog((state) => state.isOpen);
    const onOpenChange = useExchangeDialog((state) => state.setOpen);
    const { data: drivers, isLoading } = useGetDrivers();
    const { mutateAsync } = useExchangeFaultyProduct();

    const form = useForm<TExchangeSchema>({
        resolver: zodResolver(ExchangeSchema),
        defaultValues: {
            driverId: "",
        },
    });

    const onSubmit: SubmitHandler<TExchangeSchema> = async (value) => {
        await mutateAsync({
            ...data,
            driverId: value.driverId,
            complainId: data.id,
        });
        onOpenChange(false);
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild={true}>
                <Button disabled={disable}>Dispatch Exchange</Button>
            </DialogTrigger>
            <DialogContent className={"sm:max-w-[425px]"}>
                <DialogHeader>
                    <DialogTitle>Dispatch New Delivery</DialogTitle>
                    <DialogDescription>
                        Dispatch New Delivery to Exchange Faulty Product
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            name={"driverId"}
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
                                                drivers.map((driver) => (
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

                        <p className={"py-2"}>
                            <span>Required Qty: </span>
                            <span>{data.faultQty}</span>
                        </p>
                        <p className={"py-2"}>
                            <span>Total Quantity In Stock: </span>
                            <span>{data.instockQty}</span>
                        </p>
                        <Button
                            className={"mt-4 w-full"}
                            type={"submit"}
                            disabled={
                                form.formState.isSubmitting ||
                                !form.formState.isValid ||
                                data.instockQty < data.faultQty
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

export default ExchangeDialog;
