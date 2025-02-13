import { handleAdminRoutes } from "@/dashboard/handle-admin-routes";
import ProductsTable from "@/features/admin/products/components/product-table";

export default async function ProductsPage() {
    await handleAdminRoutes("Products");
    return (
        <section className="">
            <ProductsTable />
        </section>
    );
}
