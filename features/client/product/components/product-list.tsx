import React from "react";
import ProductCard from "./product-card";
import { getFeatureProducts } from "@/features/client/product/actions/get-feature-products";

const ProductList = async () => {
    const featureProducts = await getFeatureProducts();
    return (
        <section className="w-full h-full mt-6 p-4 sm:p-8">
            <div className="flex flex-col gap-5">
                <div className="mx-auto">
                    <h1 className="text-2xl font-bold">Our Feature Product</h1>
                    <p className="text-[14px] text-gray-500 text-center mt-3">
                        Product description
                    </p>
                </div>
                <div className="max-w-full overflow-x-auto flex gap-5 mt-5">
                    {featureProducts ? (
                        featureProducts.map((item) => (
                            <ProductCard key={item.id} data={item} />
                        ))
                    ) : (
                        <div>Empty</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductList;
