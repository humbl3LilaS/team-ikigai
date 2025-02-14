
import { InventoryChart } from "@/components/share/admin/dashboard-inventory-chart";
import { PopularItemsChart } from "@/components/share/admin/dashboard-popular-items-piechart";
import { SaleChart } from "@/components/share/admin/dashboard-sale-chart";
import { getApprovedOrdersCount, getDeliveringOrders, getUnfinishOrdersCount } from "@/dashboard/actions";
import { handleAdminRoutes } from "@/dashboard/handle-admin-routes";


export default async function DashboardPage() {

  await handleAdminRoutes("Dashboard");

  const pendingOrders = await getUnfinishOrdersCount();
  const approvedOrders = await getApprovedOrdersCount();
  const deliveringOrders = await getDeliveringOrders();
  // const role = (await auth())?.user.role;
  // const acceptRoles = adminSideBarItems.find(({ title }) => title == "Dashboard");
  // const isValidate = acceptRoles?.role.includes(role!);
  // if (!isValidate) {
  //   notFound();
  // }

  return (
    <main className="w-full bg-background px-3 md:px-5 max-w-screen-xl">
      <h1 className="admin-header pl-2">Dashboard</h1>
      <section className="mb-2">
        <h2 className="admin-secondary-header">Orders</h2>
        <div className="flex gap-3 w-full items-center px-2 max-w-screen-lg">
          <OrderCard num={pendingOrders.count} title="Pending" color="bg-red-500/10 border-red-400/30 text-red-600 dark:text-red-100" />
          <OrderCard num={approvedOrders.count} title="Approved" color="bg-green-500/10 border-green-400/30 text-green-600 dark:text-green-100" />
          <OrderCard num={deliveringOrders.count} title="Delivering" color="bg-yellow-500/10 border-yellow-400/30 text-yellow-600 dark:text-yellow-100" />
        </div>
      </section>

      <section className="p-2 flex flex-col sm:flex-row gap-5 *:flex-1 max-w-screen-lg">
        <SaleChart />
        <PopularItemsChart />
      </section>

      <section className="p-2 max-w-screen-lg">
        <InventoryChart />
      </section>
    </main>
  );
}

function OrderCard({ num, title, color }: { num: number, title: string, color: string }) {
  return (
    <div
      className={`border p-3 lg:py-5 rounded-md text-center ring-secondary ring-1 basis-1/3 ${color}`}
    >
      <p className="text-3xl lg:text-5xl font-bold">{num}</p>
      <p>{title}</p>
    </div>
  );
}
