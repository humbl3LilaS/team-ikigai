import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { adminSideBarItems } from "@/constants/ui-constants";
import ProductsTable from "@/features/admin/products/components/product-table";

export default async function ProductsPage() {
    const role = (await auth())?.user.role;
    const acceptRoles = adminSideBarItems.find(({ title }) => title == "Products");
    const isValidate = acceptRoles?.role.includes(role!);
    if (!isValidate) {
        notFound();
    }
    return (
        <section className="">
            <ProductsTable />
        </section>
    );
}
