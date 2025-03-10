import { handleAdminRoutes } from "@/dashboard/handle-admin-routes";
import EmployeesTable from "@/features/admin/employees/components/employees-table";

export default async function EmployeesPage() {
  await handleAdminRoutes("Employees");

  return (
    <section>
      <EmployeesTable />
    </section>
  );
}
