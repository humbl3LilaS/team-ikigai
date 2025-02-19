import { getApprovedOrdersCount, getDeliveringOrders, getUnfinishOrdersCount } from "@/dashboard/actions";

import { InventoryChart } from "./dashboard-inventory-chart";
import { PopularItemsChart } from "./dashboard-popular-items-piechart";
import { SaleChart } from "./dashboard-sale-chart";

export default async function AdminDashboard() {
  const pendingOrders = await getUnfinishOrdersCount();
  const approvedOrders = await getApprovedOrdersCount();
  const deliveringOrders = await getDeliveringOrders();
  return (
    <section className="w-full bg-background px-3 md:px-5 max-w-screen-xl">
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
    </section>
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

