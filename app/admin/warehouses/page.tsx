import WarehouseTable from "@/features/admin/warehouses/components/warehouse-table";

export default function WarehousePage() {
    return (
        <section className={"flex-1 p-6"}>
            <h2 className={"mb-4 font-bold text-xl"}>Warehouse Table</h2>
            <WarehouseTable />
        </section>
    );
}
