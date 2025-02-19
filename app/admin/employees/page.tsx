import { handleAdminRoutes } from "@/dashboard/handle-admin-routes";
import EmployeesTable from "@/features/admin/employees/components/employees-table";

export default async function EmployeesPage() {
  handleAdminRoutes("Employees");
  // await getAllEmployees();
  return (
    <section className="">
      <EmployeesTable />
    </section>
  );
}
