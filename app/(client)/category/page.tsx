import FilterSidebar from "@/features/category/components/filter-sidebar";
import Pagination from "@/features/category/components/pagination";
import ProductGrid from "@/features/category/components/product-grid";
import { ProductProvider } from "@/features/category/contexts/product-context";

export default function Home() {
    return (
        <ProductProvider>
            <div className="flex flex-col">
                <main className="flex-grow container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <FilterSidebar />
                        <div className="flex-grow">
                            <ProductGrid />
                            <Pagination />
                        </div>
                    </div>
                </main>
            </div>
        </ProductProvider>
    );
}
