"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { CategoryPageQuery } from "@/app/(client)/category/page";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { BRAND, PRODUCT_CATEGORY } from "@/constants";
import AccordionField from "@/features/client/category/components/accordion-field";
import PriceRangeSelector from "@/features/client/category/components/price-range-selector";
import { useFilterSheet } from "@/features/client/category/hooks/use-filter-sheet";
import { arrayToSlug, fieldArrayOnChange } from "@/lib/utils";
import { FilterFormSchema, TFilterFormSchema } from "@/validation";

const FilterForm = ({
    defaultValues,
}: {
    defaultValues?: TFilterFormSchema;
}) => {
    const form = useForm<TFilterFormSchema>({
        resolver: zodResolver(FilterFormSchema),
        mode: "onChange",
        defaultValues: { ...defaultValues },
    });

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const setOpen = useFilterSheet((state) => state.setOpen);

    const onSubmit: SubmitHandler<TFilterFormSchema> = (values) => {
        const processedValues: CategoryPageQuery = {
            category: arrayToSlug(values.categories),
            brands: arrayToSlug(values.brands),
            min: values.priceRange[0].toString(),
            max: values.priceRange[1].toString(),
        };

        // only get the page.tsx params from the search params others are provided via defaultValues prop
        const params = new URLSearchParams(searchParams.get("page") ?? "");

        // set the searchParams object if the values[key] is not "" or undefined
        (
            Object.keys(processedValues) as (keyof typeof processedValues)[]
        ).forEach((key) => {
            if (processedValues[key]) {
                params.set(key, processedValues[key].toString());
            }
        });

        //  Toggle the filter-sheet's state
        setOpen(false);

        // push the searchParam to the current route
        router.push(`${pathname}?${params.toString()}`);
    };

    const resetFilterHandler = () => {
        form.reset();
        router.push(pathname);
    };

    return (
        <div className={"mt-6"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name={"categories"}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={"sr-only"}>
                                    Product Category
                                </FormLabel>
                                <FormControl>
                                    <div className={"flex flex-col gap-y-4"}>
                                        {PRODUCT_CATEGORY.map((type, idx) => (
                                            <div
                                                key={type + idx}
                                                className={
                                                    "flex items-center justify-between"
                                                }
                                            >
                                                <Label
                                                    htmlFor={type}
                                                    className={
                                                        "capitalize text-black/60"
                                                    }
                                                >
                                                    {type}
                                                </Label>
                                                <Checkbox
                                                    id={type}
                                                    className={"size-5"}
                                                    onCheckedChange={() => {
                                                        fieldArrayOnChange(
                                                            type,
                                                            field.value,
                                                            field.onChange,
                                                        );
                                                    }}
                                                    checked={
                                                        field.value &&
                                                        field.value.includes(
                                                            type,
                                                        )
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <hr className={"my-6"} />

                    <AccordionField title={"Price"}>
                        <FormField
                            name={"priceRange"}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <PriceRangeSelector
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </AccordionField>

                    <AccordionField title={"Brand"}>
                        <FormField
                            name={"brands"}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div
                                            className={"flex flex-col gap-y-4"}
                                        >
                                            {BRAND.map((size, idx) => (
                                                <div
                                                    key={size + idx}
                                                    className={
                                                        "flex items-center justify-between"
                                                    }
                                                >
                                                    <Label
                                                        htmlFor={size}
                                                        className={
                                                            "capitalize text-black/60"
                                                        }
                                                    >
                                                        {size}
                                                    </Label>
                                                    <Checkbox
                                                        id={size}
                                                        className={"size-5"}
                                                        checked={
                                                            field.value &&
                                                            field.value.includes(
                                                                size,
                                                            )
                                                        }
                                                        onCheckedChange={() => {
                                                            fieldArrayOnChange(
                                                                size,
                                                                field.value,
                                                                field.onChange,
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </AccordionField>

                    <Button
                        type={"submit"}
                        className={"mt-6 w-full rounded-3xl"}
                        disabled={
                            !form.formState.isValid || form.formState.isDirty
                        }
                    >
                        Apply Filter
                    </Button>
                    <Button
                        type={"button"}
                        onClick={resetFilterHandler}
                        className={"mt-4 w-full rounded-3xl bg-stone-500"}
                    >
                        Reset Filter
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default FilterForm;
