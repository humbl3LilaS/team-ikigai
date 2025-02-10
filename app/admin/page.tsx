import { PopularItemsChart } from "@/components/share/admin/dashboard-popular-items-piechart";
import { SaleChart } from "@/components/share/admin/dashboard-sale-chart";
import { getApprovedOrdersCount, getFinishedOrdersCount, getUnfinishOrdersCount } from "@/dashboard/actions";


export default async function DashboardPage() {
    const finishedOrders = await getFinishedOrdersCount();
    const unfinishedOrders = await getUnfinishOrdersCount();
    const approvedOrders = await getApprovedOrdersCount();
    return (
        <main className="w-full bg-background">
            <h1 className="admin-header pl-2">Dashboard</h1>
            <section className="">
                <h2 className="admin-secondary-header">Orders</h2>
                <div className="flex gap-3 w-full items-center px-2">
                    <OrderCard num={unfinishedOrders.count} title="Pending" color="bg-red-500/20 border-red-400 text-red-600 dark:text-red-200" />
                    <OrderCard num={finishedOrders.count} title="Finished" color="bg-yellow-500/20 border-yellow-400 text-yellow-600 dark:text-yellow-200" />
                    <OrderCard num={approvedOrders.count} title="Approved" color="bg-green-500/20 border-green-400 text-green-600 dark:text-green-200" />
                </div>
            </section>

            <section className="p-2 flex flex-col sm:flex-row gap-5 *:basis-1/2">
                <SaleChart />
                <PopularItemsChart />
            </section>
        </main>
    );
}

function OrderCard({ num, title, color }: { num: number, title: string, color: string }) {
    return (
        <div
            className={`border max-w-72 p-3 rounded-md text-center ring-secondary ring-1 basis-1/3 ${color}`}
        >
            <p className="text-3xl font-bold">{num}</p>
            <p>{title}</p>
        </div>
    );
}
