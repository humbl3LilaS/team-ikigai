"use client";

import { useMemo } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductContext } from "../contexts/product-context";
import ProductCard from "@/features/client/product/components/product-card";

export default function ProductGrid() {
    const { products, filters, updateFilters, currentPage, isLoading } =
        useProductContext();

    const filteredProducts = useMemo(() => {
        let result = products;

        if (filters.category) {
            result = result.filter(
                (product) => product.category === filters.category,
            );
        }
        if (filters.brands.length > 0) {
            result = result.filter((product) =>
                filters.brands.includes(product.brand),
            );
        }
        result = result.filter(
            (product) =>
                product.price >= filters.priceRange[0] &&
                product.price <= filters.priceRange[1],
        );

        if (filters.sort === "price_asc") {
            result.sort((a, b) => a.price - b.price);
        } else if (filters.sort === "price_desc") {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [products, filters]);

    const handleSort = (value: string) => {
        updateFilters({ sort: value });
    };

    const startIndex = (currentPage - 1) * 12;
    const endIndex = startIndex + 12;
    const displayedProducts = filteredProducts.slice(startIndex, endIndex);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(12)].map((_, index) => (
                    <div key={index} className="space-y-4">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">
                    {filteredProducts.length} products found
                </p>
                <Select onValueChange={handleSort} defaultValue={filters.sort}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="price_asc">
                            Price: Low to High
                        </SelectItem>
                        <SelectItem value="price_desc">
                            Price: High to Low
                        </SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedProducts.map((product) => (
                    <ProductCard key={product.id} data={product} />
                ))}
            </div>
            {filteredProducts.length === 0 && (
                <p className="text-center text-gray-500 mt-8">
                    No products found matching your criteria.
                </p>
            )}
        </div>
    );
}
