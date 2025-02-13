"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import DataTableBody from "@/components/share/admin/data-table-body";
import DataTableSkeleton from "@/components/share/admin/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";


import { columns } from "../columns/reports-column";
import { useGetSaleReports } from "../hooks/use-get-products";

const ReportTable = () => {
    const [date, setDate] = useState<string>(new Date().toDateString());
    const { open, isMobile } = useSidebar();

    const FormSchema = z.object({
        date: z.date({
            required_error: "Pick a date",
        }),
    });
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setDate(data.date.toDateString());
    }

    const { data: report } = useGetSaleReports(date);

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data: report ?? [],
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        state: {
            columnFilters,
        },
    });
    // console.log(report);

    return (
        <div className={"p-6 bg-background rounded-2xl relative print:-[8.3in] print:w-[11.7in]"}>
            <div className="">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex print:hidden gap-2 mb-3 items-center">
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-center">
                                    <FormLabel>
                                    </FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground",
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Choose Date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        {/* {date.toDateString()} */}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" variant="default">Submit</Button>
                    </form>
                </Form>
            </div>
            <div>
                <p className="">{date}</p>
                {!report && <DataTableSkeleton paginationOn={true} />}
                {report && (
                    <section className={`w-screen pr-3 print:w-full ${!isMobile && open ? "md:w-[calc(100vw-280px)]" : "md:w-[calc(100vw-100px)]"}`}>
                        <DataTableBody table={table} data={report ?? []} />
                        <div className="w-full bg-muted flex gap-2 py-2 mt-2 pl-2 ">
                            <p className="">Total Sales: </p>
                            <p className="font-medium">
                                {report && report.reduce((sum, item) => sum + Number(item.totalSum), 0).toLocaleString()}
                            </p>
                        </div>
                    </section>
                )}

            </div>

        </div>
    );
};

export default ReportTable;