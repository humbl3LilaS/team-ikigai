import React from "react";
import ProductCard from "../cards/productCard";

const ProductList = () => {
    return (
        <section className="w-full h-full mt-6 p-4 sm:p-8">
            <div className="flex flex-col gap-5">
                <div className="mx-auto">
                    <h1 className="text-2xl font-bold">Our Feature Product</h1>
                    <p className="text-[14px] text-gray-500 text-center mt-3">
                        Product description
                    </p>
                </div>
                {/* style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))'}} className='gap-4 mt-5' */}
                <div className="max-w-full overflow-x-auto flex gap-5 mt-5">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </section>
    );
};

export default ProductList;
