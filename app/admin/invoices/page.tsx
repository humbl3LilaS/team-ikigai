import InvoiceTable from "@/features/admin/invoice/components/invoice-table";

export default function InvoicePage() {
    return (
        <section className={"flex-1 p-6"}>
            <h2 className={"mb-4 font-bold text-xl"}>Invoice Table</h2>
            <InvoiceTable />
        </section>
    );
}
