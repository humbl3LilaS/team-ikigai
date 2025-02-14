import React from "react";
import ProductCard from "./product-card";
import { getFeatureProducts } from "@/features/client/product/actions/get-feature-products";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { clsx } from "clsx";
import { Skeleton } from "@/components/ui/skeleton";

const ProductList = async () => {
    const featureProducts = await getFeatureProducts();

    return (
        <section className="w-full max-w-screen-2xl mx-auto h-full mt-16">
            <div className="flex flex-col gap-3">
                <div className="mx-auto">
                    <h1 className="text-4xl text-center font-bold font-oswald text-[#2a384b]">Our Feature Product</h1>
                    {/* <div className="w-full max-w-4xl border-b-[1px] border-dashed border-gray-500 mt-2" /> */}
                    <p className="text-[14px] text-gray-500 text-center mt-3 font-inter">
                    Top electronics for performance and innovation
                    </p>
                </div>
                <div className="max-w-full overflow-x-auto flex gap-5 mt-5">
                    {featureProducts ? (
                        featureProducts.map((item) => (
                            <ProductCard key={item.id} data={item} />
                        ))
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {[...Array(12)].map((_, index) => (
                                <div key={index} className="space-y-4">
                                    <Skeleton className="h-48 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <Button
                    className="px-10 font-space-grotesk mt-5 mx-auto"
                    asChild={true}
                >
                    <Link href="/category">View More </Link>
                </Button>
            </div>
        </section>
    );
};

export default ProductList;
