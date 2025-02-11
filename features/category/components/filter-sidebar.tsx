"use client";
import { useEffect, useState } from "react";
import { getAllBrands, getAllCategories } from "../actions/get-products";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FormSchema = z.object({
    category: z.string().array(),
    brand: z.string().array(),
    price: z.tuple([z.number(), z.number()]),
});

const FilterSidebar = () => {
    const [allCategories, setAllCategories] = useState<{ category: string }[]>(
        [],
    );
    const [allBrands, setAllBrands] = useState<{ brand: string }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const categories = await getAllCategories();
            const brands = await getAllBrands();

            setAllCategories(categories || []);
            setAllBrands(brands || []);
        };

        fetchData();
    }, []);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            category: [],
            brand: [],
            price: [0, 0],
        },
    });

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const processedValues: {
            min: string;
            max: string;
            category: string[];
            brand: string[];
        } = {
            ...data,
            min: data.price[0].toString(),
            max: data.price[1].toString(),
        };

        const params = new URLSearchParams(searchParams.get("page") ?? "");

        (
            Object.keys(processedValues) as (keyof typeof processedValues)[]
        ).forEach((key) => {
            if (processedValues[key].length > 0) {
                params.set(
                    key,
                    Array.isArray(processedValues[key])
                        ? processedValues[key].join(",")
                        : processedValues[key],
                );
            } else {
                params.delete(key);
            }
        });

        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <Sidebar>
            <SidebarContent className="w-64 md:mt-20">
                <SidebarHeader className="p-4 border-b hidden">
                    <h2 className="text-lg font-semibold">Filters</h2>
                </SidebarHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="p-4"
                    >
                        <SidebarGroup title="Category">
                            <FormField
                                control={form.control}
                                name="category"
                                render={() => (
                                    <FormItem>
                                        <div className="mb-4">
                                            <FormLabel className="text-base">
                                                Categories
                                            </FormLabel>
                                        </div>
                                        {allCategories?.map(
                                            (categoryObj, index) => (
                                                <FormField
                                                    key={index}
                                                    control={form.control}
                                                    name="category"
                                                    render={({ field }) => {
                                                        const value =
                                                            field.value || [];
                                                        return (
                                                            <FormItem
                                                                key={index}
                                                                className="flex flex-row items-start space-x-3 space-y-0"
                                                            >
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={value.includes(
                                                                            categoryObj.category,
                                                                        )}
                                                                        onCheckedChange={(
                                                                            checked,
                                                                        ) => {
                                                                            return checked
                                                                                ? field.onChange(
                                                                                      [
                                                                                          ...value,
                                                                                          categoryObj.category,
                                                                                      ],
                                                                                  )
                                                                                : field.onChange(
                                                                                      value.filter(
                                                                                          (
                                                                                              val,
                                                                                          ) =>
                                                                                              val !==
                                                                                              categoryObj.category,
                                                                                      ),
                                                                                  );
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="text-sm font-normal">
                                                                    {
                                                                        categoryObj.category
                                                                    }
                                                                </FormLabel>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            ),
                                        )}
                                    </FormItem>
                                )}
                            />
                        </SidebarGroup>

                        <SidebarGroup title="Brand">
                            <FormField
                                control={form.control}
                                name="brand"
                                render={() => (
                                    <FormItem>
                                        <div className="mb-4">
                                            <FormLabel className="text-base">
                                                Brand
                                            </FormLabel>
                                        </div>
                                        {allBrands?.map((brandObj, index) => (
                                            <FormField
                                                key={index}
                                                control={form.control}
                                                name="brand"
                                                render={({ field }) => {
                                                    const value =
                                                        field.value || [];
                                                    return (
                                                        <FormItem
                                                            key={index}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={value.includes(
                                                                        brandObj.brand,
                                                                    )}
                                                                    onCheckedChange={(
                                                                        checked,
                                                                    ) => {
                                                                        return checked
                                                                            ? field.onChange(
                                                                                  [
                                                                                      ...value,
                                                                                      brandObj.brand,
                                                                                  ],
                                                                              )
                                                                            : field.onChange(
                                                                                  value.filter(
                                                                                      (
                                                                                          val,
                                                                                      ) =>
                                                                                          val !==
                                                                                          brandObj.brand,
                                                                                  ),
                                                                              );
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="text-sm font-normal">
                                                                {brandObj.brand}
                                                            </FormLabel>
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                        ))}
                                    </FormItem>
                                )}
                            />
                        </SidebarGroup>

                        <SidebarGroup title="Price">
                            <div className="mb-4">
                                <FormLabel className="text-base">
                                    Price Range
                                </FormLabel>
                            </div>
                            <FormField
                                name={"price"}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center space-x-2">
                                                <Input
                                                    type="number"
                                                    placeholder="Min"
                                                    {...form.register(
                                                        "price.0",
                                                        {
                                                            valueAsNumber: true,
                                                        },
                                                    )}
                                                    className="w-20"
                                                />
                                                <span>-</span>
                                                <Input
                                                    type="number"
                                                    placeholder="Max"
                                                    {...form.register(
                                                        "price.1",
                                                        {
                                                            valueAsNumber: true,
                                                        },
                                                    )}
                                                    className="w-20"
                                                />
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </SidebarGroup>

                        <SidebarFooter className="p-4">
                            <Button type="submit">Submit</Button>
                        </SidebarFooter>
                    </form>
                </Form>
            </SidebarContent>
        </Sidebar>
    );
};

export default FilterSidebar;
