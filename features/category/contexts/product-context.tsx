"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import type { CATEGORY } from "@/database/schema";
import { getFeatureProducts } from "@/features/client/product/actions/get-feature-products";

interface Product {
    id: string;
    name: string;
    category: (typeof CATEGORY.enumValues)[number];
    brand: string;
    price: number;
    description: string;
    discount: number;
    imageUrl: string;
}

interface Filters {
    priceRange: number[];
    category: (typeof CATEGORY.enumValues)[number] | "";
    brands: string[];
    sort: string;
}

interface ProductContextType {
    products: Product[];
    filters: Filters;
    currentPage: number;
    totalPages: number;
    isLoading: boolean;
    updateFilters: (newFilters: Partial<Filters>) => void;
    setCurrentPage: (page: number) => void;
    maxPrice: number;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error(
            "useProductContext must be used within a ProductProvider",
        );
    }
    return context;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<Filters>({
        priceRange: [0, 5000],
        category: "",
        brands: [],
        sort: "",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [maxPrice, setMaxPrice] = useState(5000);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const fetchedProducts = await getFeatureProducts();
                if (fetchedProducts) {
                    setProducts(fetchedProducts);
                    setFilters((prev) => ({
                        ...prev,
                        priceRange: [0, 5000],
                    }));
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const totalPages = Math.ceil(products.length / 12);

    const updateFilters = (newFilters: Partial<Filters>) => {
        setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
        setCurrentPage(1);
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                filters,
                currentPage,
                totalPages,
                isLoading,
                updateFilters,
                setCurrentPage,
                maxPrice,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
