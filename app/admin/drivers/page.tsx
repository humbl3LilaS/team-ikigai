
import { handleAdminRoutes } from "@/dashboard/handle-admin-routes";
import DriverTable from "@/features/admin/driver/components/driver-table";

export default async function DriverPage() {

    await handleAdminRoutes("Drivers");

    return (
        <section className={"flex-1 p-6"}>
            <h2 className={"mb-4 font-bold text-xl"}>Driver Table</h2>
            <DriverTable />
        </section>
    );
}
