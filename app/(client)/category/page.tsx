import { SlidersHorizontal } from "lucide-react";

import { getProductByCategory } from "@/features/client/category/actions/get-product-by-category";
import FilterForm from "@/features/client/category/components/filter-form";
import FilterSheet from "@/features/client/category/components/filter-sheet";
import ProductPreviewCard from "@/features/client/category/components/product-preview-card";
import { slugToArray } from "@/lib/utils";
import { TFilterFormSchema } from "@/validation";

export interface CategoryPageQuery {
    min: string;
    max: string;
    brands: string;
    category: string;
}

type PageProps = {
    searchParams: Promise<CategoryPageQuery>;
};

export default async function CategoryPage({ searchParams }: PageProps) {
    const query = await searchParams;
    const products = await getProductByCategory(query);

    const formDefaultValues: TFilterFormSchema = {
        categories: slugToArray(query.category),
        brands: slugToArray(query.brands),
        priceRange: [parseInt(query.min) || 0, parseInt(query.max) || 10000],
    };

    return (
        <section className={"p-8 md:p-10 lg:p-20 lg:pt-0"}>
            <div className={"lg:grid grid-cols-4 gap-x-5"}>
                <div
                    className={
                        "hidden lg:block h-fit col-span-1 border border-black/20 rounded-xl"
                    }
                >
                    <div className={"px-6 py-5"}>
                        <h2
                            className={"mb-6 flex items-center justify-between"}
                        >
                            <span className={"text-xl font-bold"}>Filters</span>
                            <SlidersHorizontal className={"size-5"} />
                        </h2>
                        <hr className={"bg-black/60"} />
                        <FilterForm defaultValues={formDefaultValues} />
                    </div>
                </div>
                <div className={"lg:col-span-3"}>
                    <nav
                        className={"mb-7 flex items-baseline gap-x-4 lg:hidden"}
                    >
                        <FilterSheet defaultValues={formDefaultValues} />
                    </nav>
                    {products && products.length === 0 && (
                        <h1
                            className={
                                "mt-10 text-2xl font-bold text-center lg:text-3xl"
                            }
                        >
                            No products
                        </h1>
                    )}
                    <div
                        className={
                            "grid  grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5"
                        }
                    >
                        {products &&
                            products.map((product) => (
                                <ProductPreviewCard
                                    data={product}
                                    key={product.id}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
