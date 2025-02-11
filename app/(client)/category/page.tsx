import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import FilterSidebar from "@/features/category/components/filter-sidebar";
import ProductGrid from "@/features/category/components/product-grid";
interface Filters {
    searchParams: Promise<{
        category?: string;
        brand?: string;
        min?: number;
        max?: number;
    }>;
}
export default async function Home({ searchParams }: Filters) {
    const filters = await searchParams;
    return (
        <SidebarProvider className="w-full z-40">
            <FilterSidebar />
            <div className="fixed top-50 right-0 z-50">
                <SidebarTrigger />
            </div>
            <main className="p-4 mx-auto">
                <ProductGrid
                    category={filters.category}
                    brand={filters.brand}
                    min={filters.min}
                    max={filters.max}
                />
            </main>
        </SidebarProvider>
    );
}
