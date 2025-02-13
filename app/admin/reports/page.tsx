import { handleAdminRoutes } from "@/dashboard/handle-admin-routes";
import ReportTable from "@/features/admin/reports/components/reports-table";

export default async function ReportPage() {

    await handleAdminRoutes("Reports");

    return (
        <section>
            <h1 className="admin-header ml-3">Daily Sales Report</h1>
            <ReportTable />
        </section>
    );
}
