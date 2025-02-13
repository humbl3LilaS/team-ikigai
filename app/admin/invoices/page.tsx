import { handleAdminRoutes } from "@/dashboard/handle-admin-routes";
import InvoiceTable from "@/features/admin/invoices/components/invoice-table";

export default async function InvoicePage() {
    await handleAdminRoutes("Invoice");
    return (
        <section className={"flex-1 p-6"}>
            <h2 className={"mb-4 font-bold text-xl"}>Invoice Table</h2>
            <InvoiceTable />
        </section>
    );
}
