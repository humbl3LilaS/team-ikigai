"use client";

import { useState, useEffect, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { CATEGORY } from "@/database/schema";
import { useProductContext } from "../contexts/product-context";

export default function FilterSidebar() {
    const { products, filters, updateFilters, maxPrice } = useProductContext();
    const [localFilters, setLocalFilters] = useState(filters);

    const allCategories = CATEGORY.enumValues;
    const allBrands = useMemo(
        () => [...new Set(products.map((p) => p.brand))],
        [products],
    );

    const priceRanges = [
        { label: "$0 - $1000", range: [0, 1000] },
        { label: "$1000 - $2000", range: [1000, 2000] },
        { label: "$2000 - $3000", range: [2000, 3000] },
        { label: "$3000 - $4000", range: [3000, 4000] },
        { label: "$4000 - $5000", range: [4000, 5000] },
    ];

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handlePriceChange = (value: number[]) => {
        setLocalFilters((prev) => ({ ...prev, priceRange: value }));
    };

    const handleCategoryChange = (
        category: (typeof CATEGORY.enumValues)[number],
    ) => {
        setLocalFilters((prev) => ({
            ...prev,
            category: prev.category === category ? "" : category,
        }));
    };

    const handleBrandChange = (brand: string, checked: boolean) => {
        setLocalFilters((prev) => ({
            ...prev,
            brands: checked
                ? [...prev.brands, brand]
                : prev.brands.filter((b) => b !== brand),
        }));
    };

    const handlePriceRangeChange = (range: number[]) => {
        setLocalFilters((prev) => ({ ...prev, priceRange: range }));
    };

    useEffect(() => {
        const timerId = setTimeout(() => {
            updateFilters(localFilters);
        }, 500);

        return () => clearTimeout(timerId);
    }, [localFilters, updateFilters]);

    return (
        <aside className="w-full md:w-64 space-y-6">
            <div>
                <h3 className="font-semibold mb-2">Categories</h3>
                <div className="space-y-2">
                    {allCategories.map((category) => (
                        <div key={category} className="flex items-center">
                            <Checkbox
                                id={category}
                                checked={localFilters.category === category}
                                onCheckedChange={() =>
                                    handleCategoryChange(category)
                                }
                            />
                            <label htmlFor={category} className="ml-2 text-sm">
                                {category}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="font-semibold mb-2">Price Range</h3>
                <div className="space-y-2">
                    {priceRanges.map(({ label, range }) => (
                        <div key={label} className="flex items-center">
                            <Checkbox
                                id={label}
                                checked={
                                    localFilters.priceRange[0] === range[0] &&
                                    localFilters.priceRange[1] === range[1]
                                }
                                onCheckedChange={() =>
                                    handlePriceRangeChange(range)
                                }
                            />
                            <label htmlFor={label} className="ml-2 text-sm">
                                {label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="font-semibold mb-2">Brands</h3>
                <div className="space-y-2">
                    {allBrands.map((brand) => (
                        <div key={brand} className="flex items-center">
                            <Checkbox
                                id={brand}
                                checked={localFilters.brands.includes(brand)}
                                onCheckedChange={(checked) =>
                                    handleBrandChange(brand, checked as boolean)
                                }
                            />
                            <label htmlFor={brand} className="ml-2 text-sm">
                                {brand}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}
