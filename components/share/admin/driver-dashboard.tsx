import { auth } from "@/auth";
import { getTotalDeliveriesByDriverId } from "@/dashboard/actions";

import DashboardCard from "./dashboard-card";
import DriverDashboardList from "./driver-dashboard-list";

export default async function DriverDashboard() {
  const session = await auth();
  const deliInfo = await getTotalDeliveriesByDriverId(session?.user.id || "");


  return (
    <section className="px-3 max-w-screen-lg">
      <h1 className="admin-header">Delivery Dashboard</h1>

      <div className="flex gap-3">
        <DashboardCard num={deliInfo[0].totalDeliveries} title={deliInfo[0].deliStatus} color="bg-red-500/10 border-red-400/30 text-red-600 dark:text-red-100" />
        <DashboardCard num={deliInfo[1].totalDeliveries} title={deliInfo[1].deliStatus} color="bg-yellow-500/10 border-yellow-400/30 text-yellow-600 dark:text-yellow-100" />
        <DashboardCard num={deliInfo[2].totalDeliveries} title={deliInfo[2].deliStatus} color="bg-green-500/10 border-green-400/30 text-green-600 dark:text-green-100" />
      </div>

      <div className="">
        <DriverDashboardList session={session} />
      </div>
    </section>
  );
}
