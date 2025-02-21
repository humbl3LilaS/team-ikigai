"use client";
import dynamic from "next/dynamic";

const AppSideBar = dynamic(() => import("@/components/share/admin/app-side-bar"), {
    ssr: false,
    loading: () =>
        <div className="hidden md:flex flex-col w-[240px] items-center gap-3 pl-2 mt-3">
            {Array.from({ length: 5 }, (_, i) => <Skeleton key={i} className="w-full h-12" />)}
        </div>,
});
import DashboardBreadcrumb from "@/components/share/admin/dashboard-breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebarState } from "@/hooks/use-sidebar-state";

export function AdminSideBar({ children }: { children: React.ReactNode }) {
    const isOpen = useSidebarState((state) => state.isOpen);
    const toggleSideBar = useSidebarState((state) => state.toggleOpen);
    return (
        <SidebarProvider open={isOpen} onOpenChange={toggleSideBar}>
            <AppSideBar />
            <main className={"flex-1"}>
                <header className="flex items-center gap-x-4">
                    <SidebarTrigger className={"size-10"} />
                    <DashboardBreadcrumb />
                </header>
                {children}
            </main>
        </SidebarProvider>
    );
}
