import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { adminSideBarItems } from "@/constants/ui-constants";
import CustomersTable from "@/features/admin/customer/components/customers-table";

export default async function CustomerPage() {
    const role = (await auth())?.user.role;
    const acceptRoles = adminSideBarItems.find(({ title }) => title == "Customers");
    const isValidate = acceptRoles?.role.includes(role!);
    if (!isValidate) {
        notFound();
    }
    return (
        <section className="text-foreground">
            <CustomersTable />
        </section>
    );
}
