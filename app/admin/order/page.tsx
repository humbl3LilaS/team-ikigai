import OrderTable from "@/features/admin/order/components/order-table";

export default function OrderPage() {
    return (
        <section className={"flex-1 p-6"}>
            <h2 className={"mb-4 font-bold text-xl"}>Orders Table</h2>
            <OrderTable />
        </section>
    );
}
