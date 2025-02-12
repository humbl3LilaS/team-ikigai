import ProductCard from "@/features/client/product/components/product-card";
import { getAllProducts, getProductWithFilters } from "../actions/get-products";

interface Filters {
    category?: string;
    brand?: string;
    min?: number;
    max?: number;
}

const ProductGrid = async ({ category, brand, min, max }: Filters) => {
    const filters = {
        category,
        brand,
        min,
        max,
    };

    if (filters !== undefined) {
        const products = await getProductWithFilters(filters);
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products?.map((product, index) => (
                    <ProductCard key={index} data={product} />
                ))}
            </div>
        );
    }

    const products = await getAllProducts();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products?.map((product, index) => (
                <ProductCard key={index} data={product} />
            ))}
        </div>
    );
};
export default ProductGrid;
