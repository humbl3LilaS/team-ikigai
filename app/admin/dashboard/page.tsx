import AdminDashboard from "@/components/share/admin/admin-dashboard";
import DriverDashboard from "@/components/share/admin/driver-dashboard";
import { handleAdminRoutes } from "@/dashboard/handle-admin-routes";

export default async function DashboardPage() {

  const session = await handleAdminRoutes("Dashboard");
  const role = session?.user.role;

  switch (role) {
    case "ADMIN":
      return <AdminDashboard />;

    case "DRIVER":
      return <DriverDashboard />;
    default:
      break;
  }

}

