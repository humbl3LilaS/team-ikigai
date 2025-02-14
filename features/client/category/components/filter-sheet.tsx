"use client";

import { SlidersHorizontal } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import FilterForm from "@/features/client/category/components/filter-form";
import { useFilterSheet } from "@/features/client/category/hooks/use-filter-sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { TFilterFormSchema } from "@/validation";

type FilterSheetProps = {
    defaultValues: TFilterFormSchema;
};
const FilterSheet = ({ defaultValues }: FilterSheetProps) => {
    const isOpen = useFilterSheet((state) => state.isOpen);
    const setOpen = useFilterSheet((state) => state.setOpen);

    const isMobile = useMediaQuery("(max-width: 768px)");
    return (
        <Sheet open={isOpen} onOpenChange={setOpen}>
            <SheetTrigger className={"ml-auto lg:hidden"} asChild={true}>
                <button
                    className={
                        "size-8  flex items-center justify-center rounded-full bg-[#f0f0f0]"
                    }
                >
                    <SlidersHorizontal className={"size-4"} />
                </button>
            </SheetTrigger>
            <SheetContent
                side={isMobile ? "bottom" : "right"}
                className={cn(
                    "h-4/5 md:h-full",
                    isMobile && "overflow-y-scroll",
                )}
            >
                <SheetHeader>
                    <SheetTitle>Filter</SheetTitle>
                </SheetHeader>
                <FilterForm defaultValues={defaultValues} />
            </SheetContent>
        </Sheet>
    );
};

export default FilterSheet;
