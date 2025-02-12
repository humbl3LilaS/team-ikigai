import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { adminSideBarItems } from "@/constants/ui-constants";
import InvoiceTable from "@/features/admin/invoices/components/invoice-table";

export default async function InvoicePage() {
    const role = (await auth())?.user.role;
    const acceptRoles = adminSideBarItems.find(
        ({ title }) => title == "Invoice",
    );
    const isValidate = acceptRoles?.role.includes(role!);
    if (!isValidate) {
        notFound();
    }
    return (
        <section className={"flex-1 p-6"}>
            <h2 className={"mb-4 font-bold text-xl"}>Invoice Table</h2>
            <InvoiceTable />
        </section>
    );
}
