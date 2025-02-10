import DeliveryTable from "@/features/admin/delivery/components/delivery-table";

export default function DeliveriesPage() {
    return (
        <section className={"flex-1 p-6"}>
            <h2 className={"mb-4 font-bold text-xl"}>Deliveries Table</h2>
            <DeliveryTable />
        </section>
    );
}
