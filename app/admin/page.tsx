import { getApprovedOrdersCount, getFinishedOrdersCount, getUnfinishOrdersCount } from "@/dashboard/actions";

export default async function DashboardPage() {
    const finishedOrders = await getFinishedOrdersCount()
    const unfinishedOrders = await getUnfinishOrdersCount()
    const approvedOrders = await getApprovedOrdersCount()
    return (
        <main className="w-full bg-background">
            <h1 className="admin-header pl-2">Dashboard</h1>
            <section className="">
                <h2 className="admin-secondary-header">Orders</h2>
                <div className="flex gap-3 w-full items-center px-2">
                    <DashboardCard num={unfinishedOrders.count} title="Pending" color="bg-red-100 border-red-400 text-red-900" />
                    <DashboardCard num={finishedOrders.count} title="Finished" color="bg-yellow-100 border-yellow-400 text-yellow-900" />
                    <DashboardCard num={approvedOrders.count} title="Approved" color="bg-green-100 border-green-400 text-green-900" />
                </div>
            </section>
        </main>
    );
}

function DashboardCard({ num, title, color }: { num: number, title: string, color: string }) {
    return (
        <div className={`border max-w-72 p-3 rounded-md text-center ring-secondary ring-1 basis-1/3 ${color}`}>
            <p className="text-3xl font-bold">{num}</p>
            <p className={color}>{title}</p>
        </div>
    )
}
