import { handleAdminRoutes } from "@/dashboard/handle-admin-routes";
import DeliveryTable from "@/features/admin/delivery/components/delivery-table";

export default async function DeliveriesPage() {
    const session = await handleAdminRoutes("Deliveries");
    const role = session?.user.role;
    return (
        <section className={"flex-1 p-6"}>
            {role === "WAREHOUSE_MANAGER" && (
                <>
                    <h2 className={"mb-4 font-bold text-xl"}>
                        Deliveries Table
                    </h2>
                    <DeliveryTable />
                </>
            )}
            {role === "DRIVER" && (
                <>
                    <h2 className={"mb-4 font-bold text-xl"}>
                        Your Deliveries
                    </h2>
                    <DeliveryTable userId={session?.user.id} />
                </>
            )}
        </section>
    );
}
