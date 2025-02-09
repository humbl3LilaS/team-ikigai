export default function DashboardPage() {
    return (
        <main className="w-full bg-background">
            <h1 className="admin-header">Dashboard</h1>
            <section className="flex gap-3 w-full items-center px-2">
                <DashboardCard num={5} title="Orders" />
                <DashboardCard num={10} title="Messages" />
                <DashboardCard num={12} title="Orders" />
            </section>
        </main>
    );
}

function DashboardCard({num,title}:{num:number, title:string}) {
    return (
        <div className="bg-secondary border p-3 rounded-md text-center ring-secondary ring-1 basis-1/3">
            <p className="text-3xl font-bold">{num}</p>
            <p className="text-foreground/80">{title}</p>
        </div>
    )
}
